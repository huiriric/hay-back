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
                result.ok = true;
                result.name = exist.name;
                result.phone = exist.phone;
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
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map