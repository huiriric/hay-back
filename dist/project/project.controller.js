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
    deleteProject(id) {
        return this.projectService.deleteProject(id);
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
    getRecordWork(id) {
        return this.projectService.getRecordWork(id);
    }
    getRecord(id) {
        return this.projectService.getRecordProject(id);
    }
    deleteWork(id) {
        return this.projectService.deleteWork(id);
    }
    getWorksProjectUser(project, user) {
        return this.projectService.getWorksProjectUser(project, user);
    }
    getWorksUser(id) {
        return this.projectService.getWorkListUser(id);
    }
    getWorkerPositionListUser(id) {
        return this.projectService.getWorkerPositionListUser(id);
    }
    getWork(id) {
        return this.projectService.getWork(id);
    }
    getMarkerInfo(userID, workID) {
        return this.projectService.getMarkerInfo(userID, workID);
    }
    saveEcofield(ecofieldDto) {
        return this.projectService.saveEcofield(ecofieldDto);
    }
    getEcoListProject(id) {
        return this.projectService.getEcoListProject(id);
    }
    getEcoListUser(id) {
        return this.projectService.getEcoListUser(id);
    }
    getEcoInfo(id) {
        return this.projectService.getEcoInfo(id);
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
    (0, common_1.Get)('delete/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '프로젝트 제거'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '프로젝트 제거 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteProject", null);
__decorate([
    (0, common_1.Post)('addWorker'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '방제사 추가 성공'
    }),
    (0, swagger_1.ApiOperation)({
        summary: '방제사 추가'
    }),
    (0, swagger_1.ApiBody)({ type: project_dto_1.addWorkerDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.addWorkerDto]),
    __metadata("design:returntype", void 0)
], ProjectController.prototype, "addWorker", null);
__decorate([
    (0, common_1.Get)('getWorkerList/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '방제사 리스트 불러오기',
        description: '방제사 리스트 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '방제사 리스트 불러오기 성공' }),
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
    (0, swagger_1.ApiBody)({ type: project_dto_1.workDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.workDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "saveWork", null);
__decorate([
    (0, common_1.Get)('getRecordWork/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '작업 기록 불러오기'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: '작업 기록 불러오기 성공'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getRecordWork", null);
__decorate([
    (0, common_1.Get)('getRecordProject/:project'),
    (0, swagger_1.ApiOperation)({
        summary: '프로젝트 기록 불러오기'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: '프로젝트 기록 불러오기 성공'
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getRecord", null);
__decorate([
    (0, common_1.Get)('deleteWork/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '작업 제거',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '작업 제거 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "deleteWork", null);
__decorate([
    (0, common_1.Get)('getWorksProjectUser/:project/:user'),
    (0, swagger_1.ApiOperation)({
        summary: '프로젝트 작업 리스트 불러오기',
        description: '프로젝트 작업 리스트 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '프로젝트 작업 리스트 불러오기 성공' }),
    __param(0, (0, common_1.Param)('project')),
    __param(1, (0, common_1.Param)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getWorksProjectUser", null);
__decorate([
    (0, common_1.Get)('getWorkListUser/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '유저 작업 리스트 불러오기',
        description: '유저 작업 리스트 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '유저 작업 리스트 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getWorksUser", null);
__decorate([
    (0, common_1.Get)('getWorkerPositionListUser/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '유저 방제사 위치 리스트 불러오기',
        description: '유저 방제사 위치 리스트 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '유저 방제사 위치 리스트 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getWorkerPositionListUser", null);
__decorate([
    (0, common_1.Get)('getWork/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '작업 정보 불러오기',
        description: '작업 정보 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '작업 정보 불러오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getWork", null);
__decorate([
    (0, common_1.Get)('getMarkerInfo/:userID/:workID'),
    (0, swagger_1.ApiOperation)({
        summary: '마커 정보 불러오기',
        description: '마커 정보 불러오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '마커 정보 불러오기 성공' }),
    __param(0, (0, common_1.Param)('userID')),
    __param(1, (0, common_1.Param)('workID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getMarkerInfo", null);
__decorate([
    (0, common_1.Post)('saveEco'),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: '친환경 필지 저장 성공'
    }),
    (0, swagger_1.ApiOperation)({
        summary: '친환경 필지 저장'
    }),
    (0, swagger_1.ApiBody)({ type: project_dto_1.ecofieldDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_dto_1.ecofieldDto]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "saveEcofield", null);
__decorate([
    (0, common_1.Get)('getEcoListProject/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '친환경 필지 가져오기',
        description: '친환경 필지 가져오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '친환경 필지 가져오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getEcoListProject", null);
__decorate([
    (0, common_1.Get)('getEcoListUser/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '친환경 필지 가져오기',
        description: '친환경 필지 가져오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '친환경 필지 가져오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getEcoListUser", null);
__decorate([
    (0, common_1.Get)('getEcoInfo/:id'),
    (0, swagger_1.ApiOperation)({
        summary: '친환경 필지 정보 가져오기',
        description: '친환경 필지 정보 가져오기'
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: '친환경 필지 정보 가져오기 성공' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProjectController.prototype, "getEcoInfo", null);
ProjectController = __decorate([
    (0, common_1.Controller)('project'),
    __metadata("design:paramtypes", [project_service_1.ProjectService])
], ProjectController);
exports.ProjectController = ProjectController;
//# sourceMappingURL=project.controller.js.map