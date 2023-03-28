import { CoreOutput } from 'src/common/dto/output.dto';
import { addWorkerDto, ecofieldDto, ProjectDto, workDto } from './dto/project.dto';
import { ecofieldListOutputDto, ecofieldOutputDto, markerInfoDto, projectListOutputDto, recordOutputDto, workerListOutputDto, workerPositionListDto, workListOutputDto, workOutputDto } from './dto/project.output.dto';
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(ProjectInputDto: ProjectDto): Promise<import("./dto/project.output.dto").projectOutputDto>;
    getProjectList(id: number): Promise<projectListOutputDto>;
    deleteProject(id: number): Promise<CoreOutput>;
    addWorker(worker: addWorkerDto): Promise<void>;
    getWorkerList(id: number): Promise<workerListOutputDto>;
    saveWork(workList: workDto): Promise<workListOutputDto>;
    getRecordWork(id: number): Promise<recordOutputDto>;
    getRecord(id: number): Promise<recordOutputDto>;
    deleteWork(id: number): Promise<CoreOutput>;
    getWorksProjectUser(project: number, user: number): Promise<workListOutputDto>;
    getWorksUser(id: number): Promise<workListOutputDto>;
    getWorkerPositionListUser(id: number): Promise<workerPositionListDto>;
    getWork(id: number): Promise<workOutputDto>;
    getMarkerInfo(userID: number, workID: number): Promise<markerInfoDto>;
    saveEcofield(ecofieldDto: ecofieldDto): Promise<CoreOutput>;
    getEcoListProject(id: number): Promise<ecofieldListOutputDto>;
    getEcoListUser(id: number): Promise<ecofieldListOutputDto>;
    getEcoInfo(id: number): Promise<ecofieldOutputDto>;
}
