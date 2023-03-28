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
exports.ecofieldDto = exports.recordDto = exports.workDto = exports.addWorkerDto = exports.workerDto = exports.ProjectDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class ProjectDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'primary key' }),
    __metadata("design:type", Number)
], ProjectDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'userId' }),
    __metadata("design:type", Number)
], ProjectDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'project name' }),
    __metadata("design:type", String)
], ProjectDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'project owner' }),
    __metadata("design:type", String)
], ProjectDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, description: 'project status' }),
    __metadata("design:type", Boolean)
], ProjectDto.prototype, "status", void 0);
exports.ProjectDto = ProjectDto;
class workerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'project_id' }),
    __metadata("design:type", Number)
], workerDto.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'worker_id' }),
    __metadata("design:type", Number)
], workerDto.prototype, "worker_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'worker_name' }),
    __metadata("design:type", String)
], workerDto.prototype, "worker_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'worker_role' }),
    __metadata("design:type", String)
], workerDto.prototype, "role", void 0);
exports.workerDto = workerDto;
class addWorkerDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'project_id' }),
    __metadata("design:type", Number)
], addWorkerDto.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'worker_id' }),
    __metadata("design:type", Number)
], addWorkerDto.prototype, "worker_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'worker_role' }),
    __metadata("design:type", String)
], addWorkerDto.prototype, "role", void 0);
exports.addWorkerDto = addWorkerDto;
class workDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'id' }),
    __metadata("design:type", Number)
], workDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'project_id' }),
    __metadata("design:type", Number)
], workDto.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'address' }),
    __metadata("design:type", String)
], workDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'owner' }),
    __metadata("design:type", String)
], workDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'phone' }),
    __metadata("design:type", String)
], workDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'area' }),
    __metadata("design:type", Number)
], workDto.prototype, "area", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'workerId' }),
    __metadata("design:type", Number)
], workDto.prototype, "worker_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'workerName' }),
    __metadata("design:type", String)
], workDto.prototype, "worker_name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'request' }),
    __metadata("design:type", String)
], workDto.prototype, "request", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'prefer' }),
    __metadata("design:type", String)
], workDto.prototype, "prefer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'status' }),
    __metadata("design:type", String)
], workDto.prototype, "status", void 0);
exports.workDto = workDto;
class recordDto extends workDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'work_id' }),
    __metadata("design:type", Number)
], recordDto.prototype, "work_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'url' }),
    __metadata("design:type", String)
], recordDto.prototype, "url", void 0);
exports.recordDto = recordDto;
class ecofieldDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'project_id' }),
    __metadata("design:type", Number)
], ecofieldDto.prototype, "project_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'address' }),
    __metadata("design:type", String)
], ecofieldDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, description: 'areae' }),
    __metadata("design:type", Number)
], ecofieldDto.prototype, "area", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'owner' }),
    __metadata("design:type", String)
], ecofieldDto.prototype, "owner", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: String, description: 'phone' }),
    __metadata("design:type", String)
], ecofieldDto.prototype, "phone", void 0);
exports.ecofieldDto = ecofieldDto;
//# sourceMappingURL=project.dto.js.map