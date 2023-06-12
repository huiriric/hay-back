import { ApiProperty } from '@nestjs/swagger';
import {
    BaseEntity,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

export class CoreEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: Number, description: 'Key ID' })
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export class OnlyId extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiProperty({ type: Number, description: 'Key ID' })
    id: number;
}
