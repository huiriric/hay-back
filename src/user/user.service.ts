import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { changeShareDto, loginDto, positionDto, signupDto, tokenLoginDto } from './dto/user.dto';
import { loginOutputDto, searchUserOutputDto, signupOutputDto } from './dto/user.output.dto';
import { CoreOutput } from 'src/common/dto/output.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>
  ) { }

  async signup(signup: signupDto): Promise<signupOutputDto> {
    const result = new signupOutputDto();

    try {
      const exist = await this.user.findOneBy(
        signup
      )
      if (exist) {
        result.ok = false;
        result.error = '이미 존재하는 휴대폰 번호입니다.';
      } else {
        signup.share = true;
        await this.user.save(signup);
        result.ok = true;
        result.name = signup.name;
        result.phone = signup.phone;
      }
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = error;
    }
    return result;
  }

  async login(login: loginDto): Promise<loginOutputDto> {
    const result = new loginOutputDto();

    try {
      const exist = await this.user.findOneBy({
        phone: login.phone,
        password: login.password
      })
      if (exist) {
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
        token: token.token
      })

      if (exist) {
        result.ok = true;
        result.id = exist.id;
        result.name = exist.name;
        result.phone = exist.phone;
        result.share = exist.share;
      } else {
        result.ok = false;
        result.error = '토큰값이 존재하지 않습니다.'
      }
      
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = '토큰 로그인 중 오류가 발생했습니다.'
    }
    return result;
  }

  async logout(id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const exist = await this.user.findOneBy({
        id: id
      })
      exist.on = false; // 앱이 paused 상태일 때
      exist.token = null;
      await this.user.save(exist)
      result.ok = true;
      result.error = 'Logout 성공'
      // console.log(exist.id + ' 로그아웃')
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = '로그아웃 도중 오류가 발생했습니다.'
      
    }
    return result;
  }

  async paused(id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const exist = await this.user.findOneBy({
        id: id
      })
      exist.on = false;
      await this.user.save(exist);
      result.ok = true;
    } catch (ex) {
      console.log(ex);
      result.ok = false;
      result.error = 'paused 도중 오류가 발생했습니다.'
    }
    return result;
  }

  async resume(id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const exist = await this.user.findOneBy({
        id: id
      })
      exist.on = true;
      await this.user.save(exist);
      result.ok = true;
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = '재실행 상태를 저장하던 도중 오류가 발생했습니다.'
    }
    return result;
  }

  async searchUser(phone: string): Promise<searchUserOutputDto> {
    const result = new searchUserOutputDto();

    try {

      const user = await this.user.findOneBy({
        phone: phone
      })
      if (user) {
        result.ok = true;
        result.id = user.id
        result.name = user.name
        result.phone = user.phone
      }
      return result
      
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = '사용자를 찾던 도중 오류가 발생했습니다.'
    }
  }

  async sharePosition(position: positionDto): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      // console.log(position);
      const save = await this.user.save(position)
      result.ok = true;
    } catch (error) {
      console.log(error)
      result.ok = false
      result.error = '위치를 저장하는 도중 오류가 발생했습니다.'
    }
    return result;
  }

  async changeShare(changeShareDto: changeShareDto): Promise<CoreOutput> {
    const result = new CoreOutput();
    console.log('share: ' + changeShareDto.share);

    try {
      const exist = await this.user.findOneBy({
        id: changeShareDto.id
      })
      exist.share = changeShareDto.share;
      const save = await this.user.save(exist);
      result.ok = true;
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = '위치 공유 유무를 변경하는 도중 오류가 발생했습니다.'
    }
    return result;
  }

  async getShare(id: number): Promise<boolean> {
    try {
      const user = await this.user.findOneBy({
        id: id
      })
      return user.share;
    } catch (error) {
      console.log(error)
      return null
    }
  }
}
