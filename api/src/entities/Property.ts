import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    Generated,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { PropertyI } from '@interfaces/Property';
import { PropertyGroupEntity } from './PropertGroup';
import { _LangsTransEntity } from './_Trans';
import { TransI } from '@interfaces/Trans';

@Entity('trans_property')
export class PropertyTransEntity extends _LangsTransEntity implements TransI {
    @PrimaryColumn('int8', { select: false })
    @Generated('rowid')
    id: number;

    @OneToOne(() => PropertyGroupEntity, ({ title }) => title, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    column_id: string;
}

@Entity('property')
export class PropertyEntity implements PropertyI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @OneToOne(() => PropertyTransEntity, ({ column_id }) => column_id, { cascade: true, eager: true })
    @JoinColumn({ name: 'title', referencedColumnName: 'id' })
    @ApiProperty({ type: PropertyTransEntity })
    title: TransI;

    @Column({ unique: true })
    @ApiProperty()
    alt_name: string;

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @ManyToOne(() => PropertyGroupEntity, ({ properties }) => properties, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'propertygroup' })
    @ApiProperty()
    propertygroup: PropertyGroupEntity;
}
