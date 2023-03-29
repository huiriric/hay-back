import { getRepository } from 'typeorm';
import { ecofield, project, work, worker_role } from './entity/project.entity';
import { ProjectService } from './project.service';


export async function checkProject() {
  const nodeSchedule = require('node-schedule');
  const checkSchedule = nodeSchedule.scheduleJob('00 00 01 * * *', function () {
    check();
  })
}

export async function check() {
  var today = new Date();
  today = new Date(today);
  console.log(today);

  const list = await project.findBy({
    status: true
  })
  console.log(list)

  list.forEach(async (val, index) => {
    var temp = new Date(val.updatedAt.setDate(val.updatedAt.getDate() + 1));
    if (temp < today) {
      await project.delete({
        id: val.id
      })
      await work.delete({
        project_id: val.id
      })
      await worker_role.delete({
        project_id: val.id
      })
      await ecofield.delete({
        project_id: val.id
      })
    }
  })
}