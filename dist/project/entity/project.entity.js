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
exports.work = exports.worker_role = exports.project = void 0;
const core_entity_1 = require("../../common/entity/core.entity");
const typeorm_1 = require("typeorm");
let project = class project extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], project.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], project.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], project.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], project.prototype, "status", void 0);
project = __decorate([
    (0, typeorm_1.Entity)()
], project);
exports.project = project;
let worker_role = class worker_role extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], worker_role.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], worker_role.prototype, "worker_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], worker_role.prototype, "role", void 0);
worker_role = __decorate([
    (0, typeorm_1.Entity)()
], worker_role);
exports.worker_role = worker_role;
let work = class work extends core_entity_1.CoreEntity {
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], work.prototype, "project_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], work.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric' }),
    __metadata("design:type", Number)
], work.prototype, "area", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], work.prototype, "owner", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], work.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], work.prototype, "worker_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], work.prototype, "request", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], work.prototype, "prefer", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], work.prototype, "status", void 0);
work = __decorate([
    (0, typeorm_1.Entity)()
], work);
exports.work = work;
//# sourceMappingURL=project.entity.js.map