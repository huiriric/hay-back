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
exports.workListOutputDto = exports.workerListOutputDto = exports.projectListOutputDto = exports.projectOutputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const output_dto_1 = require("../../common/dto/output.dto");
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
class workerListOutputDto extends output_dto_1.CoreOutput {
}
exports.workerListOutputDto = workerListOutputDto;
class workListOutputDto extends output_dto_1.CoreOutput {
}
exports.workListOutputDto = workListOutputDto;
//# sourceMappingURL=project.output.dto.js.map