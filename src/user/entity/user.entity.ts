import { CoreEntity } from 'src/common/entity/core.entity';
import {
  Column,
  Entity
} from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  name: string;
}