import { CoreEntity } from "src/common/entity/core.entity";
export declare class project extends CoreEntity {
    user_id: number;
    name: string;
    owner: string;
    status: boolean;
}
export declare class worker_role extends CoreEntity {
    project_id: number;
    worker_id: number;
    role: string;
}
export declare class work extends CoreEntity {
    project_id: number;
    address: string;
    area: number;
    owner: string;
    phone: string;
    worker_id: number;
    worker_name: string;
    request: string;
    prefer: string;
    status: string;
}
export declare class record extends work {
    work_id: number;
    url: string;
}
export declare class ecofield extends CoreEntity {
    project_id: number;
    address: string;
    area: number;
    owner: string;
    phone: string;
}
