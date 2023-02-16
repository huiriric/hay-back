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
exports.loginOutputDto = exports.signupOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const output_dto_1 = require("../../common/dto/output.dto");
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
exports.loginOutputDto = loginOutputDto;
//# sourceMappingURL=user.output.dto.js.map