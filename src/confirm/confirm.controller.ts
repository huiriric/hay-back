import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { tokenLoginDto } from 'src/user/dto/user.dto';
import { ConfirmService } from './confirm.service';
import { adminLoginDto, userDto, userListOutputDto } from './dto/confirm.dto';

@Controller('confirm')
export class ConfirmController {
  constructor(private readonly confirmService: ConfirmService) {}
  @Post('login')
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
  })
  @ApiOperation({
    description: '로그인',
  })
  @ApiBody({
    type: adminLoginDto,
  })
  login(@Body() adminLoginDto: adminLoginDto): Promise<CoreOutput> {
    return this.confirmService.login(adminLoginDto);
  }

  @Post('tokenLogin')
  @ApiResponse({
    status: 201,
    description: '토큰 로그인 성공',
  })
  @ApiOperation({
    description: '토큰 로그인',
  })
  @ApiBody({
    type: tokenLoginDto,
  })
  tokenLogin(@Body() tokenLoginDto: tokenLoginDto) {
    return this.confirmService.tokenLogin(tokenLoginDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: '유저 리스트 가져오기 성공',
  })
  @ApiOperation({
    description: '유저 리스트 가져오기',
  })
  getUsers(): Promise<userListOutputDto> {
    return this.confirmService.getUsers();
  }

  @Post('user')
  @ApiResponse({
    status: 201,
    description: '유저 승인 성공',
  })
  @ApiOperation({
    description: '유저 승인',
  })
  @ApiBody({ type: userDto })
  confirm(@Body() user: userDto): Promise<CoreOutput> {
    return this.confirmService.confirm(user);
  }
}
