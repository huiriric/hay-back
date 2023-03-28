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
exports.changeShareDto = exports.positionDto = exports.sharePositionDto = exports.loginDto = exports.signupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class signupDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '휴대폰 번호' }),
    __metadata("design:type", String)
], signupDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '비밀번호' }),
    __metadata("design:type", String)
], signupDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '이름' }),
    __metadata("design:type", String)
], signupDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: '위치 공유' }),
    __metadata("design:type", Boolean)
], signupDto.prototype, "share", void 0);
exports.signupDto = signupDto;
class loginDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '휴대폰 번호' }),
    __metadata("design:type", String)
], loginDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: '비밀번호' }),
    __metadata("design:type", String)
], loginDto.prototype, "password", void 0);
exports.loginDto = loginDto;
class sharePositionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'id' }),
    __metadata("design:type", Number)
], sharePositionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'name' }),
    __metadata("design:type", String)
], sharePositionDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'longitude' }),
    __metadata("design:type", Number)
], sharePositionDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'latitude' }),
    __metadata("design:type", Number)
], sharePositionDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'share' }),
    __metadata("design:type", Boolean)
], sharePositionDto.prototype, "share", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'on' }),
    __metadata("design:type", Boolean)
], sharePositionDto.prototype, "on", void 0);
exports.sharePositionDto = sharePositionDto;
class positionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'id' }),
    __metadata("design:type", Number)
], positionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'latitude' }),
    __metadata("design:type", Number)
], positionDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'longitude' }),
    __metadata("design:type", Number)
], positionDto.prototype, "longitude", void 0);
exports.positionDto = positionDto;
class changeShareDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'id' }),
    __metadata("design:type", Number)
], changeShareDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'share' }),
    __metadata("design:type", Boolean)
], changeShareDto.prototype, "share", void 0);
exports.changeShareDto = changeShareDto;
//# sourceMappingURL=user.dto.js.map