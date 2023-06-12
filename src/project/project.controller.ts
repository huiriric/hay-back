import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoreOutput } from 'src/common/dto/output.dto';
import { addWorkerDto, ecofieldDto, getWorksExcelDto, ProjectDto, workDto, workerDto } from './dto/project.dto';
import {
  codeinfoOutputDto,
  donginfoOutputDto,
  ecofieldListOutputDto,
  ecofieldOutputDto,
  markerInfoDto,
  projectListOutputDto,
  recordOutputDto,
  workerListOutputDto,
  workerPositionListDto,
  workListOutputDto,
  workOutputDto,
  workPercentOutputDto,
} from './dto/project.output.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @ApiResponse({
    status: 101,
    description: '프로젝트 등록 성공',
  })
  @ApiOperation({
    summary: '프로젝트 등록',
  })
  @ApiBody({ type: ProjectDto })
  createProject(@Body() ProjectInputDto: ProjectDto) {
    return this.projectService.createProject(ProjectInputDto);
  }

  @Get('get/:id')
  @ApiOperation({
    summary: '프로젝트 리스트 불러오기',
  })
  @ApiResponse({ status: 200, description: '프로젝트 리스트 불러오기 성공' })
  getProjectList(@Param('id') id: number): Promise<projectListOutputDto> {
    return this.projectService.getProjectList(id);
  }

  @Get('delete/:id')
  @ApiOperation({
    summary: '프로젝트 제거',
  })
  @ApiResponse({ status: 200, description: '프로젝트 제거 성공' })
  deleteProject(@Param('id') id: number): Promise<CoreOutput> {
    return this.projectService.deleteProject(id);
  }

  @Post('addWorker')
  @ApiResponse({
    status: 201,
    description: '방제사 추가 성공',
  })
  @ApiOperation({
    summary: '방제사 추가',
  })
  @ApiBody({ type: addWorkerDto })
  addWorker(@Body() worker: addWorkerDto) {
    return this.projectService.addworker(worker);
  }

  @Get('getWorkerList/:id')
  @ApiOperation({
    summary: '방제사 리스트 불러오기',
    description: '방제사 리스트 불러오기',
  })
  @ApiResponse({ status: 200, description: '방제사 리스트 불러오기 성공' })
  getWorkerList(@Param('id') id: number): Promise<workerListOutputDto> {
    return this.projectService.getWorkerList(id);
  }

  @Post('saveWork')
  @ApiResponse({
    status: 201,
    description: '작업 저장 성공',
  })
  @ApiOperation({
    summary: '작업 저장',
  })
  @ApiBody({ type: workDto })
  saveWork(@Body() workList: workDto): Promise<workListOutputDto> {
    return this.projectService.saveWork(workList);
  }

  @Post('editWork')
  @ApiResponse({
    status: 201,
    description: '작업 수정 성공',
  })
  @ApiOperation({
    summary: '작업 수정',
  })
  @ApiBody({ type: workDto })
  editWork(@Body() workList: workDto): Promise<workListOutputDto> {
    return this.projectService.editWork(workList);
  }

  @Post('editWorker')
  @ApiResponse({
    status: 201,
    description: '작업자 수정 성공',
  })
  @ApiOperation({
    summary: '작업자 수정',
  })
  @ApiBody({ type: workDto })
  editWorker(@Body() workList: workDto): Promise<workListOutputDto> {
    return this.projectService.editWorker(workList);
  }

  @Get('getRecordWork/:id')
  @ApiOperation({
    summary: '작업 기록 불러오기',
  })
  @ApiResponse({
    status: 200,
    description: '작업 기록 불러오기 성공',
  })
  getRecordWork(@Param('id') id: number): Promise<recordOutputDto> {
    return this.projectService.getRecordWork(id);
  }

  @Get('getRecordProject/:id')
  @ApiOperation({
    summary: '프로젝트 기록 불러오기',
  })
  @ApiResponse({
    status: 200,
    description: '프로젝트 기록 불러오기 성공',
  })
  getRecord(@Param('id') id: number): Promise<recordOutputDto> {
    return this.projectService.getRecordProject(id);
  }

  @Get('deleteWork/:id')
  @ApiOperation({
    summary: '작업 제거',
  })
  @ApiResponse({ status: 200, description: '작업 제거 성공' })
  deleteWork(@Param('id') id: number): Promise<CoreOutput> {
    return this.projectService.deleteWork(id);
  }

  @Get('getWorksProjectUser/:project/:user/:onlyMine')
  @ApiOperation({
    summary: '프로젝트 작업 리스트 불러오기',
    description: '프로젝트 작업 리스트 불러오기',
  })
  @ApiResponse({ status: 200, description: '프로젝트 작업 리스트 불러오기 성공' })
  getWorksProjectUser(
    @Param('project') project: number,
    @Param('user') user: number,
    @Param('onlyMine') onlyMine: boolean,
  ): Promise<workListOutputDto> {
    return this.projectService.getWorksProjectUser(project, user, onlyMine);
  }

  @Post('getWorksExcel/:project/:user')
  @ApiOperation({
    summary: '프로젝트 작업 리스트 불러오기',
    description: '프로젝트 작업 리스트 불러오기',
  })
  @ApiBody({ type: getWorksExcelDto })
  @ApiResponse({ status: 200, description: '프로젝트 작업 리스트 불러오기 성공' })
  getWorksExcel(@Param('project') project: number, @Param('user') user: number, @Body() days: getWorksExcelDto): Promise<workListOutputDto> {
    return this.projectService.getWorksExcel(project, user, days);
  }

  @Get('getWorksPercent/:project/:user')
  @ApiOperation({
    summary: '프로젝트 진행도 불러오기',
    description: '프로젝트 진행도 불러오기',
  })
  @ApiResponse({ status: 200, description: '프로젝트 진행도 불러오기 성공' })
  getWorksPercent(@Param('project') project: number, @Param('user') user: number): Promise<workPercentOutputDto> {
    return this.projectService.getWorksPercent(project, user);
  }

  @Get('getWorkListUser/:id')
  @ApiOperation({
    summary: '유저 작업 리스트 불러오기',
    description: '유저 작업 리스트 불러오기',
  })
  @ApiResponse({ status: 200, description: '유저 작업 리스트 불러오기 성공' })
  getWorksUser(@Param('id') id: number): Promise<workListOutputDto> {
    return this.projectService.getWorkListUser(id);
  }

  @Get('getWorkerPositionListUser/:id')
  @ApiOperation({
    summary: '유저 방제사 위치 리스트 불러오기',
    description: '유저 방제사 위치 리스트 불러오기',
  })
  @ApiResponse({ status: 200, description: '유저 방제사 위치 리스트 불러오기 성공' })
  getWorkerPositionListUser(@Param('id') id: number): Promise<workerPositionListDto> {
    return this.projectService.getWorkerPositionListUser(id);
  }

  @Get('getWork/:id')
  @ApiOperation({
    summary: '작업 정보 불러오기',
    description: '작업 정보 불러오기',
  })
  @ApiResponse({ status: 200, description: '작업 정보 불러오기 성공' })
  getWork(@Param('id') id: number): Promise<workOutputDto> {
    return this.projectService.getWork(id);
  }

  @Get('getMarkerInfo/:userID/:workID')
  @ApiOperation({
    summary: '마커 정보 불러오기',
    description: '마커 정보 불러오기',
  })
  @ApiResponse({ status: 200, description: '마커 정보 불러오기 성공' })
  getMarkerInfo(@Param('userID') userID: number, @Param('workID') workID: number): Promise<markerInfoDto> {
    return this.projectService.getMarkerInfo(userID, workID);
  }

  @Post('saveEco')
  @ApiResponse({
    status: 201,
    description: '친환경 필지 저장 성공',
  })
  @ApiOperation({
    summary: '친환경 필지 저장',
  })
  @ApiBody({ type: ecofieldDto })
  saveEcofield(@Body() ecofieldDto: ecofieldDto): Promise<CoreOutput> {
    return this.projectService.saveEcofield(ecofieldDto);
  }

  @Get('getEcoListProject/:id')
  @ApiOperation({
    summary: '친환경 필지 가져오기',
    description: '친환경 필지 가져오기',
  })
  @ApiResponse({ status: 200, description: '친환경 필지 가져오기 성공' })
  getEcoListProject(@Param('id') id: number): Promise<ecofieldListOutputDto> {
    return this.projectService.getEcoListProject(id);
  }

  @Get('getEcoListUser/:id')
  @ApiOperation({
    summary: '친환경 필지 가져오기',
    description: '친환경 필지 가져오기',
  })
  @ApiResponse({ status: 200, description: '친환경 필지 가져오기 성공' })
  getEcoListUser(@Param('id') id: number): Promise<ecofieldListOutputDto> {
    return this.projectService.getEcoListUser(id);
  }

  @Get('getEcoInfo/:id')
  @ApiOperation({
    summary: '친환경 필지 정보 가져오기',
    description: '친환경 필지 정보 가져오기',
  })
  @ApiResponse({ status: 200, description: '친환경 필지 정보 가져오기 성공' })
  getEcoInfo(@Param('id') id: number): Promise<ecofieldOutputDto> {
    return this.projectService.getEcoInfo(id);
  }

  @Get('formatWork')
  formatWork() {
    return this.projectService.format_work();
  }

  @Get('dongInfo/:code')
  @ApiOperation({
    summary: '동 정보 가져오기',
    description: '동 정보 가져오기',
  })
  @ApiResponse({ status: 200, description: '동 정보 가져오기 성공' })
  getDong(@Param('code') code: string): Promise<donginfoOutputDto> {
    return this.projectService.getDong(code);
  }

  @Get('codeInfo/:dong')
  @ApiOperation({
    summary: '동 코드 가져오기',
    description: '동 코드 가져오기',
  })
  @ApiResponse({
    status: 200,
    description: '동 코드 가져오기 성공'
  })
  getCode(@Param('dong') dong: string): Promise<codeinfoOutputDto> {
    return this.projectService.getCode(dong);
  }
}
