import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectDto, workDto, workerDto } from './dto/project.dto';
import { projectListOutputDto, workerListOutputDto, workListOutputDto } from './dto/project.output.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }
  
  @Post('create')
  @ApiResponse({
    status: 101,
    description: '프로젝트 등록 성공'
  })
  @ApiOperation({
    summary: '프로젝트 등록'
  })
  @ApiBody({ type: ProjectDto })
  createProject(@Body() ProjectInputDto: ProjectDto) {
    return this.projectService.createProject(ProjectInputDto);
  }

  @Get('get/:id')
  @ApiOperation({
    summary: '프로젝트 리스트 불러오기'
  })
  @ApiResponse({ status: 200, description: '프로젝트 리스트 불러오기 성공' })
  getProjectList(@Param('id') id: number): Promise<projectListOutputDto> {
    return this.projectService.getProjectList(id);
  }

  @Post('addWorker')
  @ApiResponse({
    status: 201,
    description: '작업자 추가 성공'
  })
    @ApiOperation({
  summary:'작업자 추가'
    })
  @ApiBody({ type: [workerDto] })
  addWorker(@Body() worker: workerDto[]) {
    return this.projectService.addworker(worker);
  }

  @Get('getWorkerList/:id')
  @ApiOperation({
    summary: '작업자 리스트 불러오기',
    description: '작업자 리스트 불러오기'
  })
  @ApiResponse({ status: 200, description: '작업자 리스트 불러오기 성공'})
  getWorkerList(@Param('id') id: number): Promise<workerListOutputDto> {
    return this.projectService.getWorkerList(id);
  }

  @Post('saveWork')
  @ApiResponse({
    status: 201,
    description: '작업 저장 성공'
  })
  @ApiOperation({
    summary: '작업 저장'
  })
  @ApiBody({ type: [workDto] })
  saveWork(@Body() workList: workDto[]): Promise<workListOutputDto> {
    return this.projectService.saveWork(workList);
  }

  @Get('getWork/:id')
  @ApiOperation({
    summary: '작업 리스트 불러오기',
    description: '작업 리스트 불러오기'
  })
  @ApiResponse({ status: 200, description: '작업 리스트 불러오기 성공'})
  getWorkList(@Param('id') id: number): Promise<workListOutputDto> {
    return this.projectService.getWork(id);
  }
}
