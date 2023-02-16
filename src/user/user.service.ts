import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { loginDto, signupDto } from './dto/user.dto';
import { loginOutputDto, signupOutputDto } from './dto/user.output.dto';

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
      const exist = await this.user.findOneBy(login)
      if (exist) {
        result.ok = true;
        result.name = exist.name;
        result.phone = exist.phone;
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
}
