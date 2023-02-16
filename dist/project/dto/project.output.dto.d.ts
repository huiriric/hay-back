import { CoreOutput } from "src/common/dto/output.dto";
import { ProjectDto, workDto, workerDto } from "./project.dto";
export declare class projectOutputDto extends CoreOutput {
    userId: number;
    project: string;
}
export declare class projectListOutputDto extends CoreOutput {
    projects: ProjectDto[];
}
export declare class workerListOutputDto extends CoreOutput {
    worker: workerDto[];
}
export declare class workListOutputDto extends CoreOutput {
    work: workDto[];
}
