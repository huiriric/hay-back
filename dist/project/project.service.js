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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entity/project.entity");
const typeorm_2 = require("typeorm");
const project_dto_1 = require("./dto/project.dto");
const project_output_dto_1 = require("./dto/project.output.dto");
let ProjectService = class ProjectService {
    constructor(project, worker_role, work) {
        this.project = project;
        this.worker_role = worker_role;
        this.work = work;
    }
    async createProject(project) {
        const result = new project_output_dto_1.projectOutputDto();
        try {
            const savedProject = await this.project.save(project);
            result.ok = true;
            result.project = project.name;
            result.userId = project.user_id;
            var project_id = savedProject.id;
            const workerRole = new project_dto_1.workerDto();
            workerRole.project_id = savedProject.id;
            workerRole.worker_id = project.user_id;
            workerRole.role = '관리자';
            await this.worker_role.save(workerRole);
        }
        catch (error) {
            result.ok = false;
            result.error = error;
        }
        return result;
    }
    async getProjectList(user_id) {
        const result = new project_output_dto_1.projectListOutputDto();
        try {
            const roleList = await this.worker_role.findBy({
                worker_id: user_id
            });
            var projectIdList = [];
            for (let i = 0; i < roleList.length; i++) {
                if (!projectIdList.includes(roleList[i].project_id))
                    projectIdList.push(roleList[i].project_id);
            }
            console.log(projectIdList);
            let projectList = [];
            for (let i = 0; i < projectIdList.length; i++) {
                projectList.push(await this.project.findOneBy({
                    id: projectIdList[i]
                }));
            }
            result.projects = projectList;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '프로젝트 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async addworker(worker) {
        const result = new project_output_dto_1.workerListOutputDto();
        try {
            await this.worker_role.save(worker);
            result.worker = worker;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '작업자 리스트를 저장하는 도중 오류가 발생했습니다.';
        }
    }
    async getWorkerList(project_id) {
        const result = new project_output_dto_1.workerListOutputDto();
        try {
            const list = await this.worker_role.findBy({ project_id: project_id });
            result.worker = list;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '작업자 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async saveWork(workList) {
        const result = new project_output_dto_1.workListOutputDto();
        try {
            const save = await this.work.save(workList);
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '작업을 저장하는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getWork(project_id) {
        const result = new project_output_dto_1.workListOutputDto();
        try {
            const list = await this.work.findBy({
                project_id: project_id
            });
            result.work = list;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '작업 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.project)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.worker_role)),
    __param(2, (0, typeorm_1.InjectRepository)(project_entity_1.work)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map