import { ApiProperty } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dto/output.dto";
import { User } from "../entity/user.entity";


export class signupOutputDto extends CoreOutput{

  @ApiProperty({ type: String, description: '휴대폰 번호' })
  phone: string;

  @ApiProperty({ type: String, description: '이름' })
  name: string;
}

export class loginOutputDto extends CoreOutput {

  @ApiProperty({ type: Number, description: 'id' })
  id: number;

  @ApiProperty({ type: String, description: '휴대폰 번호' })
  phone: string;

  @ApiProperty({ type: String, description: '이름' })
  name: string;

  @ApiProperty({ type: Boolean, description: '위치 공유' })
  share: boolean;
}

export class userListOutputDto extends CoreOutput {
  @ApiProperty({ type: [User], description: 'user' })
  user: User[]
}

export class userPositionOutputDto {
  
}

export class searchUserOutputDto extends CoreOutput {
  @ApiProperty({ type: Number, description: 'id' })
  id: number;

  @ApiProperty({ type: String, description: '이름' })
  name: string;

  @ApiProperty({ type: String, description: '휴대폰 번호' })
  phone: string;
}