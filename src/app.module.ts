import { Module } from '@nestjs/common';
import { ProjectController } from './project/project.controller';
import { ProjectModule } from './project/project.module';
import { ProjectService } from './project/project.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entity/user.entity';
import { ecofield, project, record, work, worker_role } from './project/entity/project.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'reorderadmin',
      password: 'reorder0427!',
      database: 'reorderplus',
      synchronize: true,
      logging: ['error'],
      entities: [User, project, work, worker_role, record, ecofield],
      useUTC: false
    }),
    UserModule, ProjectModule],
  
})
export class AppModule {}
