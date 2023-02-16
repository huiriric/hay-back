export declare class ProjectDto {
    user_id: number;
    name: string;
    owner: string;
    status: boolean;
}
export declare class workerDto {
    project_id: number;
    worker_id: number;
    role: string;
}
export declare class workDto {
    project_id: number;
    address: string;
    owner: string;
    phone: string;
    area: number;
    worker_id: number;
    request: string;
    prefer: string;
    status: string;
}
