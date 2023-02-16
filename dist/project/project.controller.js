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
exports.ProjectController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const project_dto_1 = require("./dto/project.dto");
const project_service_1 = require("./project.service");
let ProjectController = class ProjectController {
    constructor(projectService) {
        this.projectService = projectService;
    }
    createProject(ProjectInputDto) {
        return this.projectService.createProject(ProjectInputDto);
    }
    getProjectList(id) {
        return this.projectService.getProjectList(id);
    }
    addWorker(worker) {
        return this.projectService.addworker(worker);
    }
    getWorkerList(id) {
        return this.projectService.getWorkerList(id);
    }
    saveWork(workList) {
        return this.projectService.saveWork(workList);
    }
    getWorkList(id) {
        return this.projectService.getWork(id);
    }
};
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_1.ApiResponse)({
        status: 101,
        description: '프로젝트 등록 성공'
    }),
    (0, swagger_1.ApiOperation)({
        summary: '프로젝트 등록'
    }),
    (0, swagger_1.ApiBody)({ type: project_dto_1.ProjectDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ProjectDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "createProject", null);
__decorate([
    (0, common_1.Get)('get/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '프로젝트 리스트 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '프로젝트 리스트 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getProjectList", null);
__decorate([
    (0, common_1.Post)('addWorker'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '작업자 추가 성공'
    }),
    (0, swagger_1.ApiOperation)({
        summary: '작업자 추가'
    }),
    (0, swagger_1.ApiBody)({ type: [project_dto_1.workerDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addWorker", null);
__decorate([
    (0, common_1.Get)('getWorkerList/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '작업자 리스트 불러오기',
        description: '작업자 리스트 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '작업자 리스트 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getWorkerList", null);
__decorate([
    (0, common_1.Post)('saveWork'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '작업 저장 성공'
    }),
    (0, swagger_1.ApiOperation)({
        summary: '작업 저장'
    }),
    (0, swagger_1.ApiBody)({ type: [project_dto_1.workDto] }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "saveWork", null);
__decorate([
    (0, common_1.Get)('getWork/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '작업 리스트 불러오기',
        description: '작업 리스트 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '작업 리스트 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getWorkList", null);
ProjectController = __decorate([
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map