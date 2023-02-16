import { ProjectDto, workDto, workerDto } from './dto/project.dto';
import { projectListOutputDto, workerListOutputDto, workListOutputDto } from './dto/project.output.dto';
import { ProjectService } from './project.service';
export declare class ProjectController {
    private readonly projectService;
    constructor(projectService: ProjectService);
    createProject(ProjectInputDto: ProjectDto): Promise<import("./dto/project.output.dto").projectOutputDto>;
    getProjectList(id: number): Promise<projectListOutputDto>;
    addWorker(worker: workerDto[]): Promise<void>;
    getWorkerList(id: number): Promise<workerListOutputDto>;
    saveWork(workList: workDto[]): Promise<workListOutputDto>;
    getWorkList(id: number): Promise<workListOutputDto>;
}
