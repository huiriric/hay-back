import { ApiProperty } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dto/output.dto";


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
}