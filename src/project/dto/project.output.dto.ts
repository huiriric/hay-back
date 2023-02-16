import { ApiProperty } from "@nestjs/swagger";
import { CoreOutput } from "src/common/dto/output.dto";
import { ProjectDto, workDto, workerDto } from "./project.dto";


export class projectOutputDto extends CoreOutput {
  @ApiProperty({ type: Number, description: 'userId' })
  userId: number;

  @ApiProperty({ type: String, description: 'project_name' })
  project: string;
}

export class projectListOutputDto extends CoreOutput {
  @ApiProperty({ type: [ProjectDto], description: 'ProjectList' })
  projects: ProjectDto[]
}

export class workerListOutputDto extends CoreOutput{
  worker: workerDto[];
}

export class workListOutputDto extends CoreOutput {
  work: workDto[];
}