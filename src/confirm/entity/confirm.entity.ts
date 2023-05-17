import { CoreEntity } from 'src/common/entity/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Admin extends CoreEntity {
  @Column()
  admin_id: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;
}
