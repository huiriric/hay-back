import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { project, work, worker_role } from './entity/project.entity';
import { Repository } from 'typeorm';
import { workerDto, ProjectDto, workDto } from './dto/project.dto';
import { workerListOutputDto, projectOutputDto, workListOutputDto, projectListOutputDto } from './dto/project.output.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(project) private readonly project: Repository<project>,
    @InjectRepository(worker_role) private readonly worker_role: Repository<worker_role>,
    @InjectRepository(work) private readonly work: Repository<work>,
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

  async getProjectList(user_id: number): Promise<projectListOutputDto> {
    const result = new projectListOutputDto();

    try {
      const roleList = await this.worker_role.findBy({
        worker_id: user_id
      });
      var projectIdList = [];
      
      for (let i = 0; i < roleList.length; i++) {
        if (!projectIdList.includes(roleList[i].project_id))
          projectIdList.push(roleList[i].project_id)
      }

      console.log(projectIdList);

      let projectList = []

      for (let i = 0; i < projectIdList.length; i++) {
        projectList.push(await this.project.findOneBy({
          id: projectIdList[i]
        }))
      }

      result.projects = projectList;

      // projectIdList.forEach(async element => {
      //   result.projects.push(await this.project.findOneBy({
      //     id: element
      //   }))
      // });

      result.ok = true;
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = '프로젝트 리스트를 가져오는 도중 오류가 발생했습니다.'
    }

    return result;
  }


  async addworker(worker: workerDto[]) {
    const result = new workerListOutputDto();
    
    try {
      await this.worker_role.save(worker)
      result.worker = worker;
      result.ok = true;

    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '작업자 리스트를 저장하는 도중 오류가 발생했습니다.'
    }
  }

  async getWorkerList(project_id: number): Promise<workerListOutputDto> {
    const result = new workerListOutputDto();

    try {
      const list = await this.worker_role.findBy({ project_id: project_id });
      result.worker = list;
      result.ok = true;
    } catch (error) {
      console.log(error);
      result.ok = false;
      result.error = '작업자 리스트를 가져오는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async saveWork(workList: workDto[]): Promise<workListOutputDto> {
    const result = new workListOutputDto();

    try {
      const save = await this.work.save(workList);
      result.ok = true;
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = '작업을 저장하는 도중 오류가 발생했습니다.';
    }
    return result;
  }

  async getWork(project_id: number): Promise<workListOutputDto> {
    const result = new workListOutputDto();

    try {
      const list = await this.work.findBy({
        project_id: project_id
      })
      result.work = list;
      result.ok = true;
    } catch (error) {
      console.log(error)
      result.ok = false;
      result.error = '작업 리스트를 가져오는 도중 오류가 발생했습니다.'
    }
    return result;
  }
}
