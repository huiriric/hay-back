import { loginDto, signupDto } from './dto/user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    signup(signupDto: signupDto): Promise<import("./dto/user.output.dto").signupOutputDto>;
    login(loginDto: loginDto): Promise<import("./dto/user.output.dto").loginOutputDto>;
}
