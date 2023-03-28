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
const user_entity_1 = require("../user/entity/user.entity");
const output_dto_1 = require("../common/dto/output.dto");
const user_dto_1 = require("../user/dto/user.dto");
let ProjectService = class ProjectService {
    constructor(project, worker_role, work, user, record, ecofield) {
        this.project = project;
        this.worker_role = worker_role;
        this.work = work;
        this.user = user;
        this.record = record;
        this.ecofield = ecofield;
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
    async deleteProject(project_id) {
        const result = new output_dto_1.CoreOutput();
        try {
            const project = await this.project.delete({
                id: project_id
            });
            const works = await this.work.delete({
                project_id: project_id
            });
            const role = await this.worker_role.delete({
                project_id: project_id
            });
            const eco = await this.ecofield.delete({
                project_id: project_id
            });
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '프로젝트는 제거하는 도중 오류가 발생했습니다.';
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
        const workerEnt = new project_dto_1.workerDto();
        const result = new output_dto_1.CoreOutput();
        try {
            const exist = await this.worker_role.findOneBy({
                project_id: worker.project_id,
                worker_id: worker.worker_id
            });
            if (exist) {
                exist.role = worker.role;
                await this.worker_role.save(exist);
            }
            else {
                const user = await this.user.findOneBy({
                    id: worker.worker_id
                });
                workerEnt.project_id = worker.project_id;
                workerEnt.worker_id = worker.worker_id;
                workerEnt.role = worker.role;
                workerEnt.worker_name = user.name;
                await this.worker_role.save(workerEnt);
            }
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '방제사 리스트를 저장하는 도중 오류가 발생했습니다.';
        }
    }
    async getWorkerList(project_id) {
        const result = new project_output_dto_1.workerListOutputDto();
        let list = [];
        try {
            list = await this.worker_role.findBy({ project_id: project_id });
            result.worker = list.sort((a, b) => a.id - b.id);
            for (let i = 0; i < result.worker.length; i++) {
                if (result.worker[i].worker_id != 0) {
                    let userInfo = await this.user.findOneBy({
                        id: result.worker[i].worker_id
                    });
                    result.worker[i].worker_name = userInfo.name;
                }
                else {
                    result.worker[i].worker_name = null;
                }
            }
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '방제사 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async saveWork(work) {
        const result = new project_output_dto_1.workListOutputDto();
        try {
            const save = await this.work.save(work);
            this.recordWork(work);
            const project_id = work.project_id;
            const works = await this.work.findBy({
                project_id: project_id
            });
            let done = true;
            works.forEach((val, index) => {
                if (!(val.status == '작업 완료' || val.status == '작업 중단'))
                    done = false;
            });
            if (done) {
                const project = await this.project.findOneBy({
                    id: project_id
                });
                project.status = true;
                const save = await this.project.save(project);
            }
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '작업을 저장하는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async recordWork(work) {
        const result = new output_dto_1.CoreOutput();
        var record = new project_dto_1.recordDto();
        try {
            const id = work.id;
            record = Object.assign(Object.assign({}, work), { work_id: id, url: null, id: null });
            work.id = null;
            const save = await this.record.save(record);
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '작업을 기록하는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getRecordWork(id) {
        const result = new project_output_dto_1.recordOutputDto();
        try {
            result.records = await this.record.findBy({
                work_id: id
            });
            result.records.sort((a, b) => a.id - b.id);
            console.log(result.records);
            result.ok = true;
        }
        catch (error) {
            result.ok = false;
            result.error = '작업 기록을 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getRecordProject(id) {
        const result = new project_output_dto_1.recordOutputDto();
        try {
            result.records = await this.record.findBy({
                project_id: id
            });
            result.records.sort((a, b) => a.id - b.id);
            console.log(result.records);
            result.ok = true;
        }
        catch (error) {
            result.ok = false;
            result.error = '작업 기록을 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async deleteWork(id) {
        const result = new output_dto_1.CoreOutput();
        try {
            const delwork = await this.work.delete({
                id: id
            });
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '작업을 제거하는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getWorksProjectUser(project_id, user) {
        const result = new project_output_dto_1.workListOutputDto();
        let list = [];
        let userName = [];
        try {
            const userRole = await this.worker_role.findOneBy({
                project_id: project_id, worker_id: user
            });
            if (userRole.role == '방제사') {
                result.work = await this.work.findBy({
                    project_id: project_id,
                    worker_id: user
                });
            }
            else {
                result.work = await this.work.findBy({
                    project_id: project_id
                });
            }
            for (let i = 0; i < result.work.length; i++) {
                if (result.work[i].worker_id != 0) {
                    let userInfo = await this.user.findOneBy({
                        id: result.work[i].worker_id
                    });
                    result.work[i].worker_name = userInfo.name;
                }
                else {
                    result.work[i].worker_name = null;
                }
            }
            result.work.sort((a, b) => a.id - b.id);
            console.log(result.work);
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '프로젝트 작업 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getWorkListUser(id) {
        const result = new project_output_dto_1.workListOutputDto();
        let query = 'SELECT * FROM public.work where ';
        try {
            const project = await this.worker_role.query(`Select distinct project_id from public.worker_role where worker_id = ` + id.toString() + ` and role != '방제사'`);
            for (let i = 0; i < project.length; i++) {
                query = query + `project_id = ` + project[i].project_id.toString() + ` or `;
            }
            query = query + `worker_id = ` + id.toString() + ` order by id asc`;
            const list = await this.work.query(query);
            result.work = list;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '유저 작업 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getWorkerPositionListUser(id) {
        const result = new project_output_dto_1.workerPositionListDto();
        let query = 'Select distinct worker_id from public.worker_role where ';
        try {
            const project = await this.worker_role.query(`Select distinct project_id from public.worker_role where worker_id = ` + id.toString() + ` and role != '방제사'`);
            if (project.length > 0) {
                for (let i = 0; i < project.length; i++) {
                    if (i == 0)
                        query = query + '(';
                    query = query + `project_id = ` + project[i].project_id.toString();
                    query = i == project.length - 1 ? query + ')' : query + ' or ';
                }
                query = query + ` and worker_id != ` + id.toString();
                const list = await this.worker_role.query(query);
                var posList = [];
                for (var i = 0; i < list.length; i++) {
                    const user = await this.user.findOneBy({
                        id: list[i].worker_id,
                    });
                    if (user) {
                        const userPos = new user_dto_1.sharePositionDto();
                        userPos.id = user.id;
                        userPos.name = user.name;
                        userPos.longitude = user.longitude;
                        userPos.latitude = user.latitude;
                        userPos.share = user.share;
                        userPos.on = user.on;
                        posList.push(userPos);
                    }
                }
                result.list = posList;
            }
            else {
                result.list = [];
            }
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '유저 방제사 위치 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getWork(id) {
        const result = new project_output_dto_1.workOutputDto();
        try {
            const work = await this.work.findOneBy({
                id: id
            });
            result.work = work;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '작업 정보를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getMarkerInfo(userID, workerID) {
        const result = new project_output_dto_1.markerInfoDto();
        try {
            const info = await this.work.findOneBy({ id: workerID });
            result.work = info;
            if (info.worker_id == userID) {
                result.show = true;
            }
            else {
                const OneProject = await this.project.findOneBy({
                    id: info.project_id
                });
                if (OneProject.user_id == userID) {
                    result.show = true;
                }
                else {
                    result.show = false;
                }
            }
            const project = await this.project.findOneBy({ id: info.project_id });
            result.project_name = project.name;
            const user = await this.user.findOneBy({ id: info.worker_id });
            if (user) {
                result.worker_name = user.name;
            }
            else {
                result.worker_name = '미정';
            }
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '마커 정보를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async saveEcofield(ecofields) {
        const result = new output_dto_1.CoreOutput();
        try {
            const save = await this.ecofield.save(ecofields);
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '친환경 필지를 저장하는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getEcoListProject(project_id) {
        const result = new project_output_dto_1.ecofieldListOutputDto();
        try {
            const list = await this.ecofield.findBy({
                project_id: project_id
            });
            result.list = list;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '친환경 필지 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getEcoListUser(id) {
        const result = new project_output_dto_1.ecofieldListOutputDto();
        let query = 'SELECT * FROM public.ecofield where ';
        try {
            const project = await this.worker_role.query(`SELECT distinct project_id FROM public.worker_role where worker_id = ` + id);
            for (let i = 0; i < project.length; i++) {
                query = query + `project_id = ` + project[i].project_id.toString();
                if (i != project.length - 1)
                    query = query + ` or `;
            }
            query = query + ' order by id asc';
            const list = await this.work.query(query);
            console.log(list);
            result.list = list;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '친환경 필지 리스트를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async getEcoInfo(id) {
        const result = new project_output_dto_1.ecofieldOutputDto();
        try {
            const eco = await this.ecofield.findOneBy({
                id: id
            });
            const project = await this.project.findOneBy({
                id: eco.project_id
            });
            result.project_name = project.name;
            result.address = eco.address;
            result.owner = eco.owner;
            result.area = eco.area;
            result.phone = eco.phone;
            result.ok = true;
        }
        catch (error) {
            console.log(error);
            result.ok = false;
            result.error = '친환경 필지 정보를 가져오는 도중 오류가 발생했습니다.';
        }
        return result;
    }
    async check() {
        var today = new Date();
        today = new Date(today);
        const list = await this.project.findBy({
            status: true
        });
        list.forEach((val) => {
            var temp = new Date(val.updatedAt.setDate(val.updatedAt.getDate() + 1));
            console.log(temp);
            console.log(today);
        });
        return true;
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.project)),
    __param(1, (0, typeorm_1.InjectRepository)(project_entity_1.worker_role)),
    __param(2, (0, typeorm_1.InjectRepository)(project_entity_1.work)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(4, (0, typeorm_1.InjectRepository)(project_entity_1.record)),
    __param(5, (0, typeorm_1.InjectRepository)(project_entity_1.ecofield)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map