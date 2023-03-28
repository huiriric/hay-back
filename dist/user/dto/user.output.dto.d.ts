import { CoreOutput } from "src/common/dto/output.dto";
import { User } from "../entity/user.entity";
export declare class signupOutputDto extends CoreOutput {
    phone: string;
    name: string;
}
export declare class loginOutputDto extends CoreOutput {
    id: number;
    phone: string;
    name: string;
    share: boolean;
}
export declare class userListOutputDto extends CoreOutput {
    user: User[];
}
export declare class userPositionOutputDto {
}
export declare class searchUserOutputDto extends CoreOutput {
    id: number;
    name: string;
    phone: string;
}
