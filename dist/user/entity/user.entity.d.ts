import { CoreEntity } from 'src/common/entity/core.entity';
export declare class User extends CoreEntity {
    phone: string;
    password: string;
    name: string;
    longitude: number;
    latitude: number;
    share: boolean;
    on: boolean;
}
