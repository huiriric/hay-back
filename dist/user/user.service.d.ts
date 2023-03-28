import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { changeShareDto, loginDto, positionDto, signupDto } from './dto/user.dto';
import { loginOutputDto, searchUserOutputDto, signupOutputDto } from './dto/user.output.dto';
import { CoreOutput } from 'src/common/dto/output.dto';
export declare class UserService {
    private readonly user;
    constructor(user: Repository<User>);
    signup(signup: signupDto): Promise<signupOutputDto>;
    login(login: loginDto): Promise<loginOutputDto>;
    logout(id: number): Promise<CoreOutput>;
    resume(id: number): Promise<CoreOutput>;
    searchUser(phone: string): Promise<searchUserOutputDto>;
    sharePosition(position: positionDto): Promise<CoreOutput>;
    changeShare(changeShareDto: changeShareDto): Promise<CoreOutput>;
    getShare(id: number): Promise<boolean>;
}
