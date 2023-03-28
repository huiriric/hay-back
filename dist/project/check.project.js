"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.check = exports.checkProject = void 0;
const project_entity_1 = require("./entity/project.entity");
async function checkProject() {
    const nodeSchedule = require('node-schedule');
    const checkSchedule = nodeSchedule.scheduleJob('00 00 13 * * *', function () {
        check();
    });
}
exports.checkProject = checkProject;
async function check() {
    var today = new Date();
    today = new Date(today);
    console.log(today);
    const list = await project_entity_1.project.findBy({
        status: true
    });
    console.log(list);
    list.forEach(async (val, index) => {
        var temp = new Date(val.updatedAt.setDate(val.updatedAt.getDate() + 1));
        if (temp < today) {
            await project_entity_1.project.delete({
                id: val.id
            });
            await project_entity_1.work.delete({
                project_id: val.id
            });
            await project_entity_1.worker_role.delete({
                project_id: val.id
            });
            await project_entity_1.ecofield.delete({
                project_id: val.id
            });
        }
    });
}
exports.check = check;
//# sourceMappingURL=check.project.js.map