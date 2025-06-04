import { ApiProperty } from '@nestjs/swagger';
import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { PropertyI } from './property.interface';
import { TransEntity } from '../trans/trans.entity';
import { TransI } from '../trans/trans.interface';
import { PropertyGroupEntity } from '../propertyGroup/propertyGroup.entity';

@Entity('property')
export class PropertyEntity implements PropertyI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updated_at: Date;

    @OneToOne(() => TransEntity, { cascade: true, eager: true })
    @JoinColumn({ name: 'title', referencedColumnName: 'id' })
    @ApiProperty({ type: TransEntity })
    title: TransI;

    @Column({ unique: true })
    @ApiProperty()
    alt_name: string;

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @ManyToOne(() => PropertyGroupEntity, ({ properties }) => properties, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'propertygroup' })
    propertygroup?: PropertyGroupEntity;
}
