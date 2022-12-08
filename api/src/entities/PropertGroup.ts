import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    Generated,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { PropertyEntity } from './Property';
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { TransI } from '@interfaces/Trans';
import { _LangsTransEntity } from './_Trans';

@Entity('trans_propertygroup')
export class PropertyGroupTransEntity extends _LangsTransEntity implements TransI {
    @PrimaryColumn('int8', { select: false })
    @Generated('rowid')
    id: number;

    @OneToOne(() => PropertyGroupEntity, ({ title }) => title, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    column_id: string;
}

@Entity('propertygroup')
export class PropertyGroupEntity implements PropertyGroupI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @OneToOne(() => PropertyGroupTransEntity, ({ column_id }) => column_id, { cascade: true, eager: true })
    @JoinColumn({ name: 'title', referencedColumnName: 'id' })
    @ApiProperty({ type: PropertyGroupTransEntity })
    title: TransI;

    @Column({ unique: true })
    @ApiProperty()
    alt_name: string;

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @OneToMany(() => PropertyEntity, ({ propertygroup }) => propertygroup)
    @ApiProperty({ type: () => PropertyEntity, isArray: true, required: false })
    properties: PropertyEntity[];

    @Column({ default: false })
    @ApiProperty({ description: 'visible property for ProductCard' })
    is_primary: boolean;
}
