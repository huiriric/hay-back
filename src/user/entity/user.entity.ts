import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends CoreEntity {
  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true, type: 'numeric' })
  longitude: number;

  @Column({ nullable: true, type: 'numeric' })
  latitude: number;

  @Column({ nullable: true })
  share: boolean;

  @Column({ nullable: true })
  on: boolean;

  @Column({ nullable: true })
  confirm: boolean;
}
