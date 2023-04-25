import { ApiProperty } from '@nestjs/swagger';
import { ecofield, record } from '../entity/project.entity';

export class ProjectDto {
  @ApiProperty({ type: Number, description: 'primary key' })
  id: number;

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

  @ApiProperty({ type: String, description: 'worker_name' })
  worker_name: string;

  @ApiProperty({ type: String, description: 'worker_role' })
  role: string;
}

export class addWorkerDto {
  @ApiProperty({ type: Number, description: 'project_id' })
  project_id: number;

  @ApiProperty({ type: Number, description: 'worker_id' })
  worker_id: number;

  @ApiProperty({ type: String, description: 'worker_role' })
  role: string;
}

export class workDto {
  @ApiProperty({ type: Number, description: 'id' })
  id: number;

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

  @ApiProperty({ type: Number, description: 'workerId' })
  worker_id: number;

  @ApiProperty({ type: String, description: 'workerName' })
  worker_name: string;

  // @ApiProperty({ type: String, description: 'request' })
  // request: string;

  @ApiProperty({ type: String, description: 'workerPhone' })
  worker_phone?: string;

  @ApiProperty({ type: String, description: 'prefer' })
  prefer: string;

  @ApiProperty({ type: String, description: 'status' })
  status: string;

  @ApiProperty({ type: String, description: 'memo' })
  memo?: string;
}

export class recordDto extends workDto {
  @ApiProperty({ type: Number, description: 'work_id' })
  work_id: number;
}

export class ecofieldDto {
  @ApiProperty({ type: Number, description: 'project_id' })
  project_id: number;

  @ApiProperty({ type: String, description: 'address' })
  address: string;

  @ApiProperty({ type: Number, description: 'areae' })
  area: number;

  @ApiProperty({ type: String, description: 'owner' })
  owner: string;

  @ApiProperty({ type: String, description: 'phone' })
  phone: string;
}
