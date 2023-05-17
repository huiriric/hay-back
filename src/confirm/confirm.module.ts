import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { ConfirmController } from './confirm.controller';
import { ConfirmService } from './confirm.service';
import { Admin } from './entity/confirm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, User])],
  controllers: [ConfirmController],
  providers: [ConfirmService],
})
export class ConfirmModule {}
