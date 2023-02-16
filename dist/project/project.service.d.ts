import { project, work, worker_role } from './entity/project.entity';
import { Repository } from 'typeorm';
import { workerDto, ProjectDto, workDto } from './dto/project.dto';
import { workerListOutputDto, projectOutputDto, workListOutputDto, projectListOutputDto } from './dto/project.output.dto';
export declare class ProjectService {
    private readonly project;
    private readonly worker_role;
    private readonly work;
    constructor(project: Repository<project>, worker_role: Repository<worker_role>, work: Repository<work>);
    createProject(project: ProjectDto): Promise<projectOutputDto>;
    getProjectList(user_id: number): Promise<projectListOutputDto>;
    addworker(worker: workerDto[]): Promise<void>;
    getWorkerList(project_id: number): Promise<workerListOutputDto>;
    saveWork(workList: workDto[]): Promise<workListOutputDto>;
    getWork(project_id: number): Promise<workListOutputDto>;
}
