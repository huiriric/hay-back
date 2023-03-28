"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entity/user.entity");
const typeorm_2 = require("typeorm");
const user_output_dto_1 = require("./dto/user.output.dto");
const output_dto_1 = require("../common/dto/output.dto");
let UserService = class UserService {
    constructor(user) {
        this.user = user;
    }
    async signup(signup) {
        const result = new user_output_dto_1.signupOutputDto();
        try {
            const exist = await this.user.findOneBy(signup);
            if (exist) {
                result.ok = false;
                result.error = '이미 존재하는 휴대폰 번호입니다.';
            }
            else {
                signup.share = true;
                await this.user.save(signup);
                result.ok = true;
                result.name = signup.name;
                result.phone = signup.phone;
            }
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = error;
        }
        return result;
    }
    async login(login) {
        const result = new user_output_dto_1.loginOutputDto();
        try {
            const exist = await this.user.findOneBy(login);
            if (exist) {
                exist.on = true;
                await this.user.save(exist);
                result.ok = true;
                result.name = exist.name;
                result.phone = exist.phone;
                result.share = exist.share;
                result.id = exist.id;
            }
            else {
                result.ok = false;
                result.error = '휴대폰 번호나 비밀번호가 일치하지 않습니다.';
            }
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '로그인 중 오류가 발생했습니다.';
        }
        return result;
    }
    async logout(id) {
        const result = new output_dto_1.CoreOutput();
        try {
            const exist = await this.user.findOneBy({
                id: id
            });
            exist.on = false;
            await this.user.save(exist);
            result.ok = true;
            result.error = 'Logout 성공';
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '로그아웃 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async resume(id) {
        const result = new output_dto_1.CoreOutput();
        try {
            const exist = await this.user.findOneBy({
                id: id
            });
            exist.on = true;
            await this.user.save(exist);
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '재실행 상태를 저장하던 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async searchUser(phone) {
        const result = new user_output_dto_1.searchUserOutputDto();
        try {
            const user = await this.user.findOneBy({
                phone: phone
            });
            if (user) {
                result.ok = true;
                result.id = user.id;
                result.name = user.name;
                result.phone = user.phone;
            }
            return result;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '사용자를 찾던 도중 오류가 발생했습니다.';
        }
    }
    async sharePosition(position) {
        const result = new output_dto_1.CoreOutput();
        try {
            const save = await this.user.save(position);
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '위치를 저장하는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async changeShare(changeShareDto) {
        const result = new output_dto_1.CoreOutput();
        console.log('share: ' + changeShareDto.share);
        try {
            const exist = await this.user.findOneBy({
                id: changeShareDto.id
            });
            exist.share = changeShareDto.share;
            const save = await this.user.save(exist);
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '위치 공유 유무를 변경하는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getShare(id) {
        try {
            const user = await this.user.findOneBy({
                id: id
            });
            return user.share;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map