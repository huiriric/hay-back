import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { changeShareDto, loginDto, positionDto, signupDto, tokenLoginDto } from './dto/user.dto';
import { loginOutputDto, searchUserOutputDto, signupOutputDto } from './dto/user.output.dto';
import { CoreOutput } from 'src/common/dto/output.dto';
import { ecofield, project, record, work, worker_role } from 'src/project/entity/project.entity';
import { Admin } from 'src/confirm/entity/confirm.entity';
import * as firebase from 'firebase-admin';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(project) private readonly project: Repository<project>,
    @InjectRepository(work) private readonly work: Repository<work>,
    @InjectRepository(worker_role) private readonly worker_role: Repository<worker_role>,
    @InjectRepository(ecofield) private readonly ecofield: Repository<ecofield>,
    @InjectRepository(record) private readonly record: Repository<record>,
    @InjectRepository(Admin) private readonly admin: Repository<Admin>,
  ) {
    const serviceAccount = require('../../serviceAccountkey.json');
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount as firebase.ServiceAccount),
    });
  }

  async signup(signup: signupDto): Promise<signupOutputDto> {
    const result = new signupOutputDto();

    try {
      const exist = await this.user.findOneBy(signup);
      if (exist) {
        result.ok = false;
        result.error = '이미 존재하는 휴대폰 번호입니다.';
      } else {
        signup.share = true;
        await this.user.save(signup);
        this.sendToAdmin(signup.name);
        result.ok = true;
        result.name = signup.name;
        result.phone = signup.phone;
      }
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = error;
    }
    return result;
  }

  async sendToAdmin(name: string): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const admins = await this.admin.find();
      admins.forEach(async (element) => {
        const payload = {
          notification: {
            title: '지푸라기 가입 알림',
            body: "'" + name + "'님이 가입했습니다",
          },
          token: element.token,
        };
        // Promise.all([firebase.messaging().sendToDevice(element.token, payload)]);
        const response = await firebase.messaging().send(payload);
        console.log(response);
      });
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '관리자에게 푸시메시지를 보내는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async login(login: loginDto): Promise<loginOutputDto> {
    const result = new loginOutputDto();

    try {
      const exist = await this.user.findOneBy({
        phone: login.phone,
        password: login.password,
      });
      if (exist && !exist.confirm) {
        result.ok = false;
        result.error = '승인되지 않은 유저입니다';
      } else if (exist) {
        exist.on = true;
        console.log(exist);
        exist.token = login.token;
        await this.user.save(exist);
        result.ok = true;
        result.name = exist.name;
        result.phone = exist.phone;
        result.share = exist.share;
        result.id = exist.id;
      } else {
        result.ok = false;
        result.error = '휴대폰 번호나 비밀번호가 일치하지 않습니다.';
      }
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '로그인 중 오류가 발생했습니다.';
    }
    return result;
  }

  async tokenLogin(token: tokenLoginDto): Promise<loginOutputDto> {
    const result = new loginOutputDto();

    try {
      const exist = await this.user.findOneBy({
        token: token.token,
      });

      if (exist) {
        result.ok = true;
        result.id = exist.id;
        result.name = exist.name;
        result.phone = exist.phone;
        result.share = exist.share;
      } else {
        result.ok = false;
        result.error = '토큰값이 존재하지 않습니다.';
      }
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '토큰 로그인 중 오류가 발생했습니다.';
    }
    return result;
  }

  async logout(id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const exist = await this.user.findOneBy({
        id: id,
      });
      exist.on = false; // 앱이 paused 상태일 때
      exist.token = null;
      await this.user.save(exist);
      result.ok = true;
      result.error = 'Logout 성공';
      // console.log(exist.id + ' 로그아웃')
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '로그아웃 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async paused(id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const exist = await this.user.findOneBy({
        id: id,
      });
      exist.on = false;
      await this.user.save(exist);
      result.ok = true;
    } catch (ex) {
      console.log(ex);
      result.ok = false;
      result.error = 'paused 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async resume(id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const exist = await this.user.findOneBy({
        id: id,
      });
      exist.on = true;
      await this.user.save(exist);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '재실행 상태를 저장하던 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async searchUser(phone: string): Promise<searchUserOutputDto> {
    const result = new searchUserOutputDto();

    try {
      const user = await this.user.findOneBy({
        phone: phone,
      });
      if (user) {
        result.ok = true;
        result.id = user.id;
        result.name = user.name;
        result.phone = user.phone;
      }
      return result;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '사용자를 찾던 도중 오류가 발생했습니다.';
    }
  }

  async sharePosition(position: positionDto): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      // console.log(position);
      const save = await this.user.save(position);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '위치를 저장하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async changeShare(changeShareDto: changeShareDto): Promise<CoreOutput> {
    const result = new CoreOutput();
    console.log('share: ' + changeShareDto.share);

    try {
      const exist = await this.user.findOneBy({
        id: changeShareDto.id,
      });
      exist.share = changeShareDto.share;
      const save = await this.user.save(exist);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '위치 공유 유무를 변경하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getShare(id: number): Promise<boolean> {
    try {
      const user = await this.user.findOneBy({
        id: id,
      });
      return user.share;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async withdraw(id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      // 사용자가 관리자인 프로젝트 제거
      const project = await this.project.findBy({
        user_id: id,
      });
      project.forEach((v, i) => this.deleteProject(v.id));

      // 사용자가 방제사인 작업 id -> 0(미정)으로
      const work = await this.work.findBy({
        worker_id: id,
      });
      work.forEach(async (v, i) => {
        v.worker_id = 0;
        await this.work.save(v);
      });

      // worker_role에서 사용자 제거
      const role = await this.worker_role.delete({
        worker_id: id,
      });

      // user에서 사용자 제거
      await this.user.delete({
        id: id,
      });
    } catch (ex) {
      console.log(ex);
      result.ok = false;
      result.error = '탈퇴 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async deleteProject(project_id: number): Promise<void> {
    const result = new CoreOutput();

    try {
      const project = await this.project.delete({
        id: project_id,
      });
      const works = await this.work.delete({
        project_id: project_id,
      });
      const role = await this.worker_role.delete({
        project_id: project_id,
      });
      const eco = await this.ecofield.delete({
        project_id: project_id,
      });
      const record = await this.record.delete({
        project_id: project_id,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
