import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { loginDto, tokenLoginDto } from 'src/user/dto/user.dto';
import { loginOutputDto } from 'src/user/dto/user.output.dto';
import { Admin } from './entity/confirm.entity';
import { Repository } from 'typeorm';
import { adminLoginDto, userDto as confirmUserDto, userDto, userListOutputDto } from './dto/confirm.dto';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class ConfirmService {
  constructor(@InjectRepository(Admin) private readonly admin: Repository<Admin>, @InjectRepository(User) private readonly user: Repository<User>) {}
  async login(login: adminLoginDto): Promise<CoreOutput> {
    const result = new CoreOutput();
    try {
      const exist = await this.admin.query(
        `SELECT * FROM public.admin
        where admin_id = '` +
          login.adminID +
          `' and password = '` +
          login.password +
          `'
        ORDER BY id ASC`,
      );
      console.log(exist);
      if (exist.length == 1) {
        console.log('token:' + login.token);
        exist[0].token = login.token;
        console.log('exist: ' + exist[0]);
        await this.admin.save(exist[0]);
        result.ok = true;
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

  async tokenLogin(token: tokenLoginDto): Promise<CoreOutput> {
    const result = new CoreOutput();
    // console.log('tokenLogin started');
    // console.log(token.token);
    try {
      const exist = await this.admin.findOneBy({
        token: token.token,
      });

      if (exist) {
        result.ok = true;
      }
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '토큰 로그인 도중 오류가 발생했습니다';
    }
    return result;
  }

  async getUsers(): Promise<userListOutputDto> {
    const result = new userListOutputDto();

    try {
      var exist = await this.user.find();
      var userList = [];
      exist.forEach((element) => {
        if (!(element.id == 1 || element.id == 10)) {
          var user = new confirmUserDto();
          user.id = element.id;
          user.name = element.name;
          user.phone = element.phone;
          user.confirm = element.confirm;
          userList.push(user);
        }
      });
      userList.sort((a, b) => a.id - b.id);
      result.list = userList;
      // console.log(result.list);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '유저 리스트를 가져오는 도중 오류가 발생했습니다';
    }
    return result;
  }

  async confirm(user: userDto): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      console.log(user);
      const save = await this.user.save(user);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '유저 승인 중 오류가 발생했습니다';
    }
    return result;
  }
}
