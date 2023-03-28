import { CoreOutput } from "src/common/dto/output.dto";
import { sharePositionDto } from "src/user/dto/user.dto";
import { record } from "../entity/project.entity";
import { ecofieldDto, ProjectDto, workDto, workerDto } from "./project.dto";
export declare class projectOutputDto extends CoreOutput {
    userId: number;
    project: string;
}
export declare class projectListOutputDto extends CoreOutput {
    projects: ProjectDto[];
}
export declare class workerOutputDto extends CoreOutput {
    worker: workerDto;
}
export declare class workerListOutputDto extends CoreOutput {
    worker: workerDto[];
}
export declare class workListOutputDto extends CoreOutput {
    work: workDto[];
}
export declare class workOutputDto extends CoreOutput {
    work: workDto;
}
export declare class markerInfoDto extends CoreOutput {
    work: workDto;
    project_name: string;
    worker_name: string;
    show: boolean;
}
export declare class workerPositionListDto extends CoreOutput {
    list: sharePositionDto[];
}
export declare class recordOutputDto extends CoreOutput {
    records: record[];
}
export declare class ecofieldOutputDto extends CoreOutput {
    project_name: string;
    address: string;
    owner: string;
    area: number;
    phone: string;
}
export declare class ecofieldListOutputDto extends CoreOutput {
    list: ecofieldDto[];
}
