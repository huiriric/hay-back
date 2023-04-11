import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { changeShareDto, loginDto, positionDto, signupDto, tokenLoginDto } from './dto/user.dto';
import { searchUserOutputDto } from './dto/user.output.dto';
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

  @Post('tokenLogin')
  @ApiResponse({
    status: 201,
    description: '토큰 로그인 성공'
  })
  @ApiOperation({
    description: '토큰 로그인'
  })
  @ApiBody({
    type: tokenLoginDto
  })
  tokenLogin(@Body() tokenLoginDto: tokenLoginDto) {
    return this.userService.tokenLogin(tokenLoginDto);
  }

  @Get('logout/:id')
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공'
  })
  @ApiOperation({
    description: '로그아웃'
  })
  logout(@Param('id') id:number ) {
    return this.userService.logout(id);
  }

  @Get('paused/:id')
  @ApiResponse({
    status: 200,
    description: 'paused 성공'
  })
  @ApiOperation({
    description: 'paused'
  })
  paused(@Param('id') id:number ) {
    return this.userService.paused(id);
  }

  @Get('resume/:id')
  @ApiResponse({
    status: 200,
    description: '로그아웃 성공'
  })
  @ApiOperation({
    description: '로그아웃'
  })
  resume(@Param('id') id:number ) {
    return this.userService.resume(id);
  }

  @Get('search/:phone')
  @ApiResponse({
    status: 200,
    description: '검색 성공'
  })
  @ApiOperation({
    description: '사용자 검색'
  })
  searchUser(@Param('phone') phone: string): Promise<searchUserOutputDto> {
    return this.userService.searchUser(phone);
  } 

  @Post('sharePosition')
  @ApiResponse({
    status: 201,
    description: '위치 저장 성공'
  })
  @ApiOperation({
    description: '위치 저장'
  })
  @ApiBody({
    type: positionDto
  })
  sharePosition(@Body() positionDto: positionDto) {
    return this.userService.sharePosition(positionDto);
  }

  @Post('changeShare')
  @ApiResponse({
    status: 201,
    description: '공유 유무 변경 성공'
  })
  @ApiOperation({
    description: '공유 유무 변경'
  })
  @ApiBody({
    type: changeShareDto
  })
  changeShare(@Body() changeShareDto: changeShareDto) {
    return this.userService.changeShare(changeShareDto);
  }

  @Get('getShare/:id')
  @ApiResponse({
    status: 200,
    description: '공유 유무 get 성공'
  })
  @ApiOperation({
    description: '공유 유무 get'
  })
  getShare(@Param('id') id: number): Promise<boolean> {
    return this.userService.getShare(id);
  } 

}
