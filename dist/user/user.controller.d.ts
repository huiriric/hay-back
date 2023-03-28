import { changeShareDto, loginDto, positionDto, signupDto } from './dto/user.dto';
import { searchUserOutputDto } from './dto/user.output.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(signupDto: signupDto): Promise<import("./dto/user.output.dto").signupOutputDto>;
    login(loginDto: loginDto): Promise<import("./dto/user.output.dto").loginOutputDto>;
    logout(id: number): Promise<import("../common/dto/output.dto").CoreOutput>;
    resume(id: number): Promise<import("../common/dto/output.dto").CoreOutput>;
    searchUser(phone: string): Promise<searchUserOutputDto>;
    sharePosition(positionDto: positionDto): Promise<import("../common/dto/output.dto").CoreOutput>;
    changeShare(changeShareDto: changeShareDto): Promise<import("../common/dto/output.dto").CoreOutput>;
    getShare(id: number): Promise<boolean>;
}
