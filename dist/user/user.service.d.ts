import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { loginDto, signupDto } from './dto/user.dto';
import { loginOutputDto, signupOutputDto } from './dto/user.output.dto';
export declare class UserService {
    private readonly user;
    constructor(user: Repository<User>);
    signup(signup: signupDto): Promise<signupOutputDto>;
    login(login: loginDto): Promise<loginOutputDto>;
}
