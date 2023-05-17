import { ApiProperty } from '@nestjs/swagger';

export class signupDto {
  @ApiProperty({ type: String, description: '휴대폰 번호' })
  phone: string;

  @ApiProperty({ type: String, description: '비밀번호' })
  password: string;

  @ApiProperty({ type: String, description: '이름' })
  name: string;

  @ApiProperty({ type: Boolean, description: '위치 공유' })
  share: boolean;

  @ApiProperty({ type: Boolean, description: '승인' })
  confirm: boolean;
}

export class loginDto {
  @ApiProperty({ type: String, description: '휴대폰 번호' })
  phone: string;

  @ApiProperty({ type: String, description: '비밀번호' })
  password: string;

  @ApiProperty({ type: String, description: '토큰값' })
  token: string;
}

export class tokenLoginDto {
  @ApiProperty({ type: String, description: '토큰값' })
  token: string;
}

export class sharePositionDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: number;

  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @ApiProperty({ type: Number, description: 'longitude' })
  longitude: number;

  @ApiProperty({ type: Number, description: 'latitude' })
  latitude: number;

  @ApiProperty({ type: Boolean, description: 'share' })
  share: boolean;

  @ApiProperty({ type: Boolean, description: 'on' })
  on: boolean;
}

export class positionDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: number;

  @ApiProperty({ type: Number, description: 'latitude' })
  latitude: number;

  @ApiProperty({ type: Number, description: 'longitude' })
  longitude: number;
}

export class changeShareDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: number;

  @ApiProperty({ type: Boolean, description: 'share' })
  share: boolean;
}
