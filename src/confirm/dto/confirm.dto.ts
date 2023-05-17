import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { User } from 'src/user/entity/user.entity';

export class adminLoginDto {
  @ApiProperty({ type: String, description: '관리자 ID' })
  adminID: string;

  @ApiProperty({ type: String, description: '관리자 pass' })
  password: string;

  @ApiProperty({ type: String, description: '토큰' })
  token: string;
}

export class userDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: number;

  @ApiProperty({ type: String, description: '휴대폰 번호' })
  phone: string;

  @ApiProperty({ type: String, description: '이름' })
  name: string;

  @ApiProperty({ type: Boolean, description: '승인' })
  confirm: boolean;
}

export class userListOutputDto extends CoreOutput {
  @ApiProperty({ type: [userDto], description: '유저 리스트' })
  list: userDto[];
}
