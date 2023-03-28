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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUserOutputDto = exports.userPositionOutputDto = exports.userListOutputDto = exports.loginOutputDto = exports.signupOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const output_dto_1 = require("../../common/dto/output.dto");
const user_entity_1 = require("../entity/user.entity");
class signupOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '휴대폰 번호' }),
    __metadata("design:type", String)
], signupOutputDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '이름' }),
    __metadata("design:type", String)
], signupOutputDto.prototype, "name", void 0);
exports.signupOutputDto = signupOutputDto;
class loginOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'id' }),
    __metadata("design:type", Number)
], loginOutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '휴대폰 번호' }),
    __metadata("design:type", String)
], loginOutputDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '이름' }),
    __metadata("design:type", String)
], loginOutputDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: '위치 공유' }),
    __metadata("design:type", Boolean)
], loginOutputDto.prototype, "share", void 0);
exports.loginOutputDto = loginOutputDto;
class userListOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [user_entity_1.User], description: 'user' }),
    __metadata("design:type", Array)
], userListOutputDto.prototype, "user", void 0);
exports.userListOutputDto = userListOutputDto;
class userPositionOutputDto {
}
exports.userPositionOutputDto = userPositionOutputDto;
class searchUserOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'id' }),
    __metadata("design:type", Number)
], searchUserOutputDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '이름' }),
    __metadata("design:type", String)
], searchUserOutputDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '휴대폰 번호' }),
    __metadata("design:type", String)
], searchUserOutputDto.prototype, "phone", void 0);
exports.searchUserOutputDto = searchUserOutputDto;
//# sourceMappingURL=user.output.dto.js.map