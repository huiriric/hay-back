import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/confirm/entity/confirm.entity';
import { ecofield, project, record, work, worker_role } from 'src/project/entity/project.entity';
import { User } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, project, work, worker_role, User, record, ecofield, Admin])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
