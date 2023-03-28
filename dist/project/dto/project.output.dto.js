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
exports.ecofieldListOutputDto = exports.ecofieldOutputDto = exports.recordOutputDto = exports.workerPositionListDto = exports.markerInfoDto = exports.workOutputDto = exports.workListOutputDto = exports.workerListOutputDto = exports.workerOutputDto = exports.projectListOutputDto = exports.projectOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const output_dto_1 = require("../../common/dto/output.dto");
const user_dto_1 = require("../../user/dto/user.dto");
const project_entity_1 = require("../entity/project.entity");
const project_dto_1 = require("./project.dto");
class projectOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'userId' }),
    __metadata("design:type", Number)
], projectOutputDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'project_name' }),
    __metadata("design:type", String)
], projectOutputDto.prototype, "project", void 0);
exports.projectOutputDto = projectOutputDto;
class projectListOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [project_dto_1.ProjectDto], description: 'ProjectList' }),
    __metadata("design:type", Array)
], projectListOutputDto.prototype, "projects", void 0);
exports.projectListOutputDto = projectListOutputDto;
class workerOutputDto extends output_dto_1.CoreOutput {
}
exports.workerOutputDto = workerOutputDto;
class workerListOutputDto extends output_dto_1.CoreOutput {
}
exports.workerListOutputDto = workerListOutputDto;
class workListOutputDto extends output_dto_1.CoreOutput {
}
exports.workListOutputDto = workListOutputDto;
class workOutputDto extends output_dto_1.CoreOutput {
}
exports.workOutputDto = workOutputDto;
class markerInfoDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'project_name' }),
    __metadata("design:type", String)
], markerInfoDto.prototype, "project_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'worker_name' }),
    __metadata("design:type", String)
], markerInfoDto.prototype, "worker_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'show' }),
    __metadata("design:type", Boolean)
], markerInfoDto.prototype, "show", void 0);
exports.markerInfoDto = markerInfoDto;
class workerPositionListDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [user_dto_1.sharePositionDto], description: 'position list' }),
    __metadata("design:type", Array)
], workerPositionListDto.prototype, "list", void 0);
exports.workerPositionListDto = workerPositionListDto;
class recordOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [project_entity_1.record], description: 'record list' }),
    __metadata("design:type", Array)
], recordOutputDto.prototype, "records", void 0);
exports.recordOutputDto = recordOutputDto;
class ecofieldOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'project name' }),
    __metadata("design:type", String)
], ecofieldOutputDto.prototype, "project_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'address' }),
    __metadata("design:type", String)
], ecofieldOutputDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'owner' }),
    __metadata("design:type", String)
], ecofieldOutputDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'area' }),
    __metadata("design:type", Number)
], ecofieldOutputDto.prototype, "area", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'phone' }),
    __metadata("design:type", String)
], ecofieldOutputDto.prototype, "phone", void 0);
exports.ecofieldOutputDto = ecofieldOutputDto;
class ecofieldListOutputDto extends output_dto_1.CoreOutput {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [project_dto_1.ecofieldDto], description: 'ecofield list' }),
    __metadata("design:type", Array)
], ecofieldListOutputDto.prototype, "list", void 0);
exports.ecofieldListOutputDto = ecofieldListOutputDto;
//# sourceMappingURL=project.output.dto.js.map