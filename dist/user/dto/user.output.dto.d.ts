import { CoreOutput } from "src/common/dto/output.dto";
export declare class signupOutputDto extends CoreOutput {
    phone: string;
    name: string;
}
export declare class loginOutputDto extends CoreOutput {
    id: number;
    phone: string;
    name: string;
}
