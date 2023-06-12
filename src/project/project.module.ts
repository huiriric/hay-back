import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { donginfo, ecofield, project, record, work, worker_role } from './entity/project.entity';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([project, work, worker_role, User, record, ecofield, donginfo,])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
