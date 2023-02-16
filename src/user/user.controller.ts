import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { loginDto, signupDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('signup')
  @ApiResponse({
    status: 201,
    description: '회원가입 성공'
  })
  @ApiOperation({
    description: '회원가입'
  })
  @ApiBody({
    type: signupDto
  })
  signup(@Body() signupDto: signupDto) {
    return this.userService.signup(signupDto);
  }

  @Post('login')
  @ApiResponse({
    status: 201,
    description: '로그인 성공'
  })
  @ApiOperation({
    description: '로그인'
  })
  @ApiBody({
    type: loginDto
  })
  login(@Body() loginDto: loginDto) {
    return this.userService.login(loginDto);
  }
}
