export declare class signupDto {
    phone: string;
    password: string;
    name: string;
    share: boolean;
}
export declare class loginDto {
    phone: string;
    password: string;
}
export declare class sharePositionDto {
    id: number;
    name: string;
    longitude: number;
    latitude: number;
    share: boolean;
    on: boolean;
}
export declare class positionDto {
    id: number;
    latitude: number;
    longitude: number;
}
export declare class changeShareDto {
    id: number;
    share: boolean;
}
