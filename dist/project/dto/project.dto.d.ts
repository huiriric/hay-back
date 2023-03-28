export declare class ProjectDto {
    id: number;
    user_id: number;
    name: string;
    owner: string;
    status: boolean;
}
export declare class workerDto {
    project_id: number;
    worker_id: number;
    worker_name: string;
    role: string;
}
export declare class addWorkerDto {
    project_id: number;
    worker_id: number;
    role: string;
}
export declare class workDto {
    id: number;
    project_id: number;
    address: string;
    owner: string;
    phone: string;
    area: number;
    worker_id: number;
    worker_name: string;
    request: string;
    prefer: string;
    status: string;
}
export declare class recordDto extends workDto {
    work_id: number;
    url: string;
}
export declare class ecofieldDto {
    project_id: number;
    address: string;
    area: number;
    owner: string;
    phone: string;
}
