import { CoreEntity, OnlyId } from 'src/common/entity/core.entity';
import { Column, Entity, BeforeInsert } from 'typeorm';

@Entity()
export class project extends CoreEntity {
  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column()
  owner: string;

  @Column()
  status: boolean;
}

@Entity()
export class worker_role extends CoreEntity {
  @Column()
  project_id: number;

  @Column()
  worker_id: number;

  @Column()
  role: string;
}

@Entity()
export class work extends CoreEntity {
  @Column()
  project_id: number;

  @Column()
  address: string;

  @Column({ type: 'numeric' })
  area: number;

  @Column()
  owner: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  worker_id: number;

  @Column({ nullable: true })
  worker_name: string;

  // @Column({ nullable: true })
  // request: string;

  @Column({ nullable: true })
  prefer: string;

  @Column()
  status: string;
}

@Entity()
export class record extends work {
  @Column()
  work_id: number;
  @Column({ nullable: true })
  memo: string;
}

@Entity()
export class ecofield extends CoreEntity {
  @Column()
  project_id: number;

  @Column()
  address: string;

  @Column({ type: 'numeric' })
  area: number;

  @Column()
  owner: string;

  @Column()
  phone: string;
}

@Entity()
export class donginfo extends CoreEntity {
  @Column()
  code: string;

  @Column()
  dong: string;
}
