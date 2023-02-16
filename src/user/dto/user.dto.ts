import { ApiProperty } from "@nestjs/swagger";


export class signupDto {
  @ApiProperty({ type: String, description: '휴대폰 번호' })
  phone: string;

  @ApiProperty({ type: String, description: '비밀번호' })
  password: string;

  @ApiProperty({ type: String, description: '이름' })
  name: string;
}

export class loginDto {
  @ApiProperty({ type: String, description: '휴대폰 번호' })
  phone: string;

  @ApiProperty({ type: String, description: '비밀번호' })
  password: string;
}