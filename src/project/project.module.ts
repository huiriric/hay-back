import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { project, work, worker_role } from './entity/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([project, work, worker_role])
  ],
  controllers: [ProjectController],
  providers: [ProjectService]
})
export class ProjectModule {}
