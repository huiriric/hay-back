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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_dto_1 = require("./dto/user.dto");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    signup(signupDto) {
        return this.userService.signup(signupDto);
    }
    login(loginDto) {
        return this.userService.login(loginDto);
    }
    logout(id) {
        return this.userService.logout(id);
    }
    resume(id) {
        return this.userService.resume(id);
    }
    searchUser(phone) {
        return this.userService.searchUser(phone);
    }
    sharePosition(positionDto) {
        return this.userService.sharePosition(positionDto);
    }
    changeShare(changeShareDto) {
        return this.userService.changeShare(changeShareDto);
    }
    getShare(id) {
        return this.userService.getShare(id);
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '회원가입 성공'
    }),
    (0, swagger_1.ApiOperation)({
        description: '회원가입'
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.signupDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.signupDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '로그인 성공'
    }),
    (0, swagger_1.ApiOperation)({
        description: '로그인'
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.loginDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.loginDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('logout/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그아웃 성공'
    }),
    (0, swagger_1.ApiOperation)({
        description: '로그아웃'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('resume/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '로그아웃 성공'
    }),
    (0, swagger_1.ApiOperation)({
        description: '로그아웃'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "resume", null);
__decorate([
    (0, common_1.Get)('search/:phone'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '검색 성공'
    }),
    (0, swagger_1.ApiOperation)({
        description: '사용자 검색'
    }),
    __param(0, (0, common_1.Param)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "searchUser", null);
__decorate([
    (0, common_1.Post)('sharePosition'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '위치 저장 성공'
    }),
    (0, swagger_1.ApiOperation)({
        description: '위치 저장'
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.positionDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.positionDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "sharePosition", null);
__decorate([
    (0, common_1.Post)('changeShare'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '공유 유무 변경 성공'
    }),
    (0, swagger_1.ApiOperation)({
        description: '공유 유무 변경'
    }),
    (0, swagger_1.ApiBody)({
        type: user_dto_1.changeShareDto
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.changeShareDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "changeShare", null);
__decorate([
    (0, common_1.Get)('getShare/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: '공유 유무 get 성공'
    }),
    (0, swagger_1.ApiOperation)({
        description: '공유 유무 get'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getShare", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map