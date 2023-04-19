import { ApiProperty } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { sharePositionDto } from 'src/user/dto/user.dto';
import { record } from '../entity/project.entity';
import { ecofieldDto, ProjectDto, workDto, workerDto } from './project.dto';

export class projectOutputDto extends CoreOutput {
  @ApiProperty({ type: Number, description: 'userId' })
  userId: number;

  @ApiProperty({ type: String, description: 'project_name' })
  project: string;
}

export class projectListOutputDto extends CoreOutput {
  @ApiProperty({ type: [ProjectDto], description: 'ProjectList' })
  projects: ProjectDto[];
}

export class workerOutputDto extends CoreOutput {
  worker: workerDto;
}

export class workerListOutputDto extends CoreOutput {
  worker: workerDto[];
}

export class workListOutputDto extends CoreOutput {
  work: workDto[];
}

export class workOutputDto extends CoreOutput {
  work: workDto;
}

export class markerInfoDto extends CoreOutput {
  work: workDto;

  @ApiProperty({ type: String, description: 'project_name' })
  project_name: string;

  @ApiProperty({ type: String, description: 'worker_name' })
  worker_name: string;

  @ApiProperty({ type: Boolean, description: 'show' })
  show: boolean;
}

export class workerPositionListDto extends CoreOutput {
  @ApiProperty({ type: [sharePositionDto], description: 'position list' })
  list: sharePositionDto[];
}

export class recordOutputDto extends CoreOutput {
  @ApiProperty({ type: [record], description: 'record list' })
  records: record[];
}

export class ecofieldOutputDto extends CoreOutput {
  @ApiProperty({ type: String, description: 'project name' })
  project_name: string;

  @ApiProperty({ type: String, description: 'address' })
  address: string;

  @ApiProperty({ type: String, description: 'owner' })
  owner: string;

  @ApiProperty({ type: Number, description: 'area' })
  area: number;

  @ApiProperty({ type: String, description: 'phone' })
  phone: string;
}

export class ecofieldListOutputDto extends CoreOutput {
  @ApiProperty({ type: [ecofieldDto], description: 'ecofield list' })
  list: ecofieldDto[];
}

export class workPercentOutputDto extends CoreOutput {
  @ApiProperty({ type: Number, description: 'totalNum' })
  total: number;

  @ApiProperty({ type: Number, description: 'doneNum' })
  done: number;
}
