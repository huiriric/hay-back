import { ApiProperty } from "@nestjs/swagger";


export class ProjectDto {
  @ApiProperty({ type: Number, description: 'userId' })
  user_id: number;

  @ApiProperty({ type: String, description: 'project name' })
  name: string;

  @ApiProperty({ type: String, description: 'project owner' })
  owner: string;

  @ApiProperty({ type: Boolean, description: 'project status' })
  status: boolean;
}

export class workerDto {
  
    @ApiProperty({ type: Number, description: 'project_id' })
    project_id: number;

    @ApiProperty({ type: Number, description: 'worker_id' })
    worker_id: number;

    @ApiProperty({ type: String, description: 'worker_role' })
    role: string;
  
}

export class workDto {
  
  @ApiProperty({ type: Number, description: 'project_id' })
  project_id: number;

  @ApiProperty({ type: String, description: 'address' })
  address: string;

  @ApiProperty({ type: String, description: 'owner' })
  owner: string;

  @ApiProperty({ type: String, description: 'phone' })
  phone: string;

  @ApiProperty({ type: Number, description: 'area' })
  area: number;

  @ApiProperty({ type: Number, description: 'worker' })
  worker_id: number;

  @ApiProperty({ type: String, description: 'request' })
  request: string;

  @ApiProperty({ type: String, description: 'prefer' })
  prefer: string;

  @ApiProperty({ type: String, description: 'status' })
  status: string;
}