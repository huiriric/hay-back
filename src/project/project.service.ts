import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ecofield, project, record, work, worker_role } from './entity/project.entity';
import { Repository } from 'typeorm';
import { workerDto, ProjectDto, workDto, addWorkerDto, recordDto, ecofieldDto } from './dto/project.dto';
import {
  workerListOutputDto,
  projectOutputDto,
  workListOutputDto,
  projectListOutputDto,
  workOutputDto,
  markerInfoDto,
  workerOutputDto,
  recordOutputDto,
  workerPositionListDto,
  ecofieldListOutputDto,
  ecofieldOutputDto,
  workPercentOutputDto,
} from './dto/project.output.dto';
import { User } from 'src/user/entity/user.entity';
import { userListOutputDto } from 'src/user/dto/user.output.dto';
import { CoreOutput } from 'src/common/dto/output.dto';
import e from 'express';
import { sharePositionDto } from 'src/user/dto/user.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(project) private readonly project: Repository<project>,
    @InjectRepository(worker_role) private readonly worker_role: Repository<worker_role>,
    @InjectRepository(work) private readonly work: Repository<work>,
    @InjectRepository(User) private readonly user: Repository<User>,
    @InjectRepository(record) private readonly record: Repository<record>,
    @InjectRepository(ecofield) private readonly ecofield: Repository<ecofield>,
  ) {}

  async createProject(project: ProjectDto): Promise<projectOutputDto> {
    const result = new projectOutputDto();

    try {
      const savedProject = await this.project.save(project);
      result.ok = true;
      result.project = project.name;
      result.userId = project.user_id;

      var project_id = savedProject.id;

      const workerRole = new workerDto();

      workerRole.project_id = savedProject.id;
      workerRole.worker_id = project.user_id;
      workerRole.role = '관리자';

      await this.worker_role.save(workerRole);
    } catch (error) {
      result.ok = false;
      result.error = error;
    }
    return result;
  }

  async deleteProject(project_id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const project = await this.project.delete({
        id: project_id,
      });
      const works = await this.work.delete({
        project_id: project_id,
      });
      const role = await this.worker_role.delete({
        project_id: project_id,
      });
      const eco = await this.ecofield.delete({
        project_id: project_id,
      });
      const record = await this.record.delete({
        project_id: project_id,
      });

      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '프로젝트는 제거하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getProjectList(user_id: number): Promise<projectListOutputDto> {
    const result = new projectListOutputDto();

    try {
      const roleList = await this.worker_role.findBy({
        worker_id: user_id,
      });
      var projectIdList = [];

      for (let i = 0; i < roleList.length; i++) {
        if (!projectIdList.includes(roleList[i].project_id)) projectIdList.push(roleList[i].project_id);
      }

      let projectList = [];

      for (let i = 0; i < projectIdList.length; i++) {
        projectList.push(
          await this.project.findOneBy({
            id: projectIdList[i],
          }),
        );
      }
      result.projects = projectList;
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '프로젝트 리스트를 가져오는 도중 오류가 발생했습니다.';
    }

    return result;
  }

  async addworker(worker: addWorkerDto) {
    const workerEnt = new workerDto();
    const result = new CoreOutput();

    try {
      const exist = await this.worker_role.findOneBy({
        project_id: worker.project_id,
        worker_id: worker.worker_id,
      });
      if (exist) {
        exist.role = worker.role;
        await this.worker_role.save(exist);
      } else {
        const user = await this.user.findOneBy({
          id: worker.worker_id,
        });
        workerEnt.project_id = worker.project_id;
        workerEnt.worker_id = worker.worker_id;
        workerEnt.role = worker.role;
        workerEnt.worker_name = user.name;

        await this.worker_role.save(workerEnt);
      }
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '방제사 리스트를 저장하는 도중 오류가 발생했습니다.';
    }
  }

  async getWorkerList(project_id: number): Promise<workerListOutputDto> {
    const result = new workerListOutputDto();
    let list = [];

    try {
      list = await this.worker_role.findBy({ project_id: project_id });
      result.worker = list.sort((a, b) => a.id - b.id);
      for (let i = 0; i < result.worker.length; i++) {
        if (result.worker[i].worker_id != 0) {
          let userInfo = await this.user.findOneBy({
            id: result.worker[i].worker_id,
          });
          result.worker[i].worker_name = userInfo.name;
        } else {
          result.worker[i].worker_name = null;
        }
      }

      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '방제사 리스트를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async saveWork(work: workDto): Promise<workListOutputDto> {
    const result = new workListOutputDto();

    try {
      // 완료된 작업 삭제
      // const works = await this.work.delete({
      //   project_id: work.project_id,
      //   status: '작업 완료',
      // });

      // worker id 에 대한 이름 추가
      const user = await this.user.findOneBy({
        id: work.worker_id,
      });
      if (user) {
        work.worker_name = user.name;
      } else {
        work.worker_name = null;
      }

      const save = await this.work.save(work);

      // 기록
      this.recordWork(work);

      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '작업을 저장하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async editWork(work: workDto): Promise<workListOutputDto> {
    const result = new workListOutputDto();

    try {
      // worker id 에 대한 이름 추가
      const user = await this.user.findOneBy({
        id: work.worker_id,
      });
      if (user) {
        work.worker_name = user.name;
      } else {
        work.worker_name = null;
      }

      const save = await this.work.save(work);

      // 기록
      this.recordWork(work);

      // project 상태(진행, 완료) 변경
      // work가 완료 or 작업 제외면 완료
      const project_id = work.project_id;

      const works = await this.work.findBy({
        project_id: project_id,
      });

      let done = true;

      works.forEach((val, index) => {
        if (!(val.status == '작업 완료' || val.status == '작업 중단')) done = false;
      });

      if (done) {
        const project = await this.project.findOneBy({
          id: project_id,
        });
        project.status = true;
        const save = await this.project.save(project);
      } else {
        const project = await this.project.findOneBy({
          id: project_id,
        });
        project.status = false;
        const save = await this.project.save(project);
      }

      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '작업을 저장하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async editWorker(work: workDto): Promise<workListOutputDto> {
    const result = new workListOutputDto();

    try {
      // worker id 에 대한 이름 추가
      const user = await this.user.findOneBy({
        id: work.worker_id,
      });
      if (user) {
        work.worker_name = user.name;
      } else {
        work.worker_name = null;
      }

      const save = await this.work.save(work);

      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '작업을 저장하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async recordWork(work: workDto): Promise<CoreOutput> {
    const result = new CoreOutput();
    var record = new recordDto();

    try {
      const id = work.id;
      record = { ...work, work_id: id, id: null };
      work.id = null;
      const save = await this.record.save(record);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '작업을 기록하는 도중 오류가 발생했습니다.';
    }

    return result;
  }

  async getRecordWork(id: number): Promise<recordOutputDto> {
    const result = new recordOutputDto();

    try {
      result.records = await this.record.findBy({
        work_id: id,
      });

      result.records.sort((a, b) => b.id - a.id);
      // console.log(result.records);
      result.ok = true;
    } catch (error) {
      result.ok = false;
      result.error = '작업 기록을 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getRecordProject(id: number): Promise<recordOutputDto> {
    const result = new recordOutputDto();

    try {
      result.records = await this.record.findBy({
        project_id: id,
      });

      // console.log(result.records);

      result.records.sort((a, b) => b.id - a.id);
      // console.log(result.records);
      result.ok = true;
    } catch (error) {
      result.ok = false;
      result.error = '작업 기록을 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async deleteWork(id: number): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const delwork = await this.work.delete({
        id: id,
      });

      const deleteRecord = await this.record.delete({
        work_id: id,
      });

      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '작업을 제거하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getWorksProjectUser(project_id: number, user: number): Promise<workListOutputDto> {
    const result = new workListOutputDto();
    let list = [];
    let userName = [];
    try {
      const userRole = await this.worker_role.findOneBy({
        project_id: project_id,
        worker_id: user,
      });
      if (userRole.role == '방제사') {
        // result.work = await this.work.findBy({
        //   project_id: project_id,
        //   worker_id: user,
        //   status: '작업 예정' || '작업 시작' || '재작업 요청' || '작업 중단',
        // });
        result.work = await this.work.query(
          `SELECT * FROM public.work where project_id = ` + project_id + ` and worker_id = ` + user + ` and status != '작업 완료' ORDER BY id ASC`,
        );
      } else {
        // result.work = await this.work.findBy({
        //   project_id: project_id,
        //   status: '작업 예정' || '작업 시작' || '재작업 요청' || '작업 중단',
        // });
        result.work = await this.work.query(
          `SELECT * FROM public.work where project_id = ` + project_id + ` and status != '작업 완료' ORDER BY id ASC`,
        );
      }

      for (let i = 0; i < result.work.length; i++) {
        if (result.work[i].worker_id != 0) {
          let userInfo = await this.user.findOneBy({
            id: result.work[i].worker_id,
          });
          result.work[i].worker_name = userInfo.name;
        } else {
          result.work[i].worker_name = null;
        }
      }
      result.work.sort((a, b) => a.id - b.id);
      // console.log(result.work);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '프로젝트 작업 리스트를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getWorksExcel(project_id: number, user: number): Promise<workListOutputDto> {
    const result = new workListOutputDto();
    let list = [];
    let userName = [];
    try {
      const userRole = await this.worker_role.findOneBy({
        project_id: project_id,
        worker_id: user,
      });
      if (userRole.role == '방제사') {
        result.work = await this.work.findBy({
          project_id: project_id,
          worker_id: user,
        });
      } else {
        result.work = await this.work.findBy({
          project_id: project_id,
        });
      }

      for (let i = 0; i < result.work.length; i++) {
        if (result.work[i].worker_id != 0) {
          let userInfo = await this.user.findOneBy({
            id: result.work[i].worker_id,
          });
          result.work[i].worker_name = userInfo.name;
        } else {
          result.work[i].worker_name = null;
        }
      }
      result.work.sort((a, b) => a.id - b.id);
      // console.log(result.work);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '프로젝트 작업 리스트를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getWorksPercent(project_id: number, user: number): Promise<workPercentOutputDto> {
    const result = new workPercentOutputDto();
    let list = [];
    let userName = [];
    let total;
    let done;
    let ratio;
    let total_len;
    let done_len;
    try {
      const userRole = await this.worker_role.findOneBy({
        project_id: project_id,
        worker_id: user,
      });
      // 유저 별 전체 work
      if (userRole.role == '방제사') {
        total = await this.work.findBy({
          project_id: project_id,
          worker_id: user,
        });

        done = await this.work.findBy({
          project_id: project_id,
          worker_id: user,
          status: '작업 완료',
        });
      } else {
        total = await this.work.findBy({
          project_id: project_id,
        });

        done = await this.work.findBy({
          project_id: project_id,
          status: '작업 완료',
        });
      }
      total_len = total.length;
      done_len = done.length;
      ratio = done_len / total_len;
      console.log(ratio);

      result.total = total_len;
      result.done = done_len;
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
    }
    return result;
  }

  async getWorkListUser(id: number): Promise<workListOutputDto> {
    const result = new workListOutputDto();
    let query = 'SELECT * FROM public.work where (';

    try {
      const project = await this.worker_role.query(
        `Select distinct project_id from public.worker_role where worker_id = ` + id.toString() + ` and role != '방제사'`,
      );

      if (project.length < 1) {
        query = query + `project_id = 0 or `;
      }
      for (let i = 0; i < project.length; i++) {
        query = query + `project_id = ` + project[i].project_id.toString() + ` or `;
      }

      query = query + `worker_id = ` + id.toString() + `) and status != '작업 완료' order by id asc`;

      const list = await this.work.query(query);

      result.work = list;
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '유저 작업 리스트를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getWorkerPositionListUser(id: number): Promise<workerPositionListDto> {
    const result = new workerPositionListDto();
    let query = 'Select distinct worker_id from public.worker_role where ';

    try {
      const project = await this.worker_role.query(
        `Select distinct project_id from public.worker_role where worker_id = ` + id.toString() + ` and role != '방제사'`,
      );

      if (project.length > 0) {
        for (let i = 0; i < project.length; i++) {
          if (i == 0) query = query + '(';
          query = query + `project_id = ` + project[i].project_id.toString();
          query = i == project.length - 1 ? query + ')' : query + ' or ';
        }

        query = query + ` and worker_id != ` + id.toString();

        const list = await this.worker_role.query(query);
        var posList = [];
        for (var i = 0; i < list.length; i++) {
          const user = await this.user.findOneBy({
            id: list[i].worker_id,
            // share: true,
            // on: true
          });
          if (user) {
            const userPos = new sharePositionDto();
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
      } else {
        result.list = [];
      }

      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '유저 방제사 위치 리스트를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getWork(id: number): Promise<workOutputDto> {
    const result = new workOutputDto();

    try {
      const work = await this.work.findOneBy({
        id: id,
      });
      result.work = work;
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '작업 정보를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getMarkerInfo(userID: number, workerID: number): Promise<markerInfoDto> {
    const result = new markerInfoDto();

    try {
      const info = await this.work.findOneBy({ id: workerID });
      result.work = info;

      if (info.worker_id == userID) {
        result.show = true;
      } else {
        const OneProject = await this.project.findOneBy({
          id: info.project_id,
        });
        if (OneProject.user_id == userID) {
          result.show = true;
        } else {
          result.show = false;
        }
      }

      const project = await this.project.findOneBy({ id: info.project_id });
      result.project_name = project.name;

      const user = await this.user.findOneBy({ id: info.worker_id });
      if (user) {
        result.worker_name = user.name;
      } else {
        result.worker_name = '미정';
      }

      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '마커 정보를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async saveEcofield(ecofields: ecofieldDto): Promise<CoreOutput> {
    const result = new CoreOutput();

    try {
      const save = await this.ecofield.save(ecofields);
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '친환경 필지를 저장하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getEcoListProject(project_id: number): Promise<ecofieldListOutputDto> {
    const result = new ecofieldListOutputDto();

    try {
      const list = await this.ecofield.findBy({
        project_id: project_id,
      });
      result.list = list;
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '친환경 필지 리스트를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getEcoListUser(id: number): Promise<ecofieldListOutputDto> {
    const result = new ecofieldListOutputDto();

    try {
      const project = await this.worker_role.query(`SELECT distinct project_id FROM public.worker_role where worker_id = ` + id);

      let query = 'SELECT * FROM public.ecofield where ';

      if (project.length < 1) {
        query = query + `project_id = 0`;
      } else {
        for (let i = 0; i < project.length; i++) {
          query = query + `project_id = ` + project[i].project_id.toString();
          if (i != project.length - 1) query = query + ` or `;
        }
      }

      query = query + ' order by id asc';

      const list = await this.work.query(query);

      // console.log(list);

      result.list = list;
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '친환경 필지 리스트를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getEcoInfo(id: number): Promise<ecofieldOutputDto> {
    const result = new ecofieldOutputDto();

    try {
      const eco = await this.ecofield.findOneBy({
        id: id,
      });

      const project = await this.project.findOneBy({
        id: eco.project_id,
      });

      result.project_name = project.name;
      result.address = eco.address;
      result.owner = eco.owner;
      result.area = eco.area;
      result.phone = eco.phone;
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '친환경 필지 정보를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async check(): Promise<boolean> {
    var today = new Date();
    today = new Date(today);

    const list = await this.project.findBy({
      status: true,
    });

    list.forEach((val) => {
      var temp = new Date(val.updatedAt.setDate(val.updatedAt.getDate() + 1));
      // if (temp < today) {
      // this.ProjectService.deleteProject(val.id);
      console.log(temp);
      console.log(today);
      // }
    });
    return true;
  }

  //각 work에 worker_id에 해당하는 worker_name 추가
  async format_work() {
    const works = await this.work.findBy({});
    for (var i = 0; i < works.length; i++) {
      const user = await this.user.findOneBy({ id: works[i].worker_id });
      if (user) {
        works[i].worker_name = user.name;
        await this.work.save(works[i]);
      }
    }
  }
}
