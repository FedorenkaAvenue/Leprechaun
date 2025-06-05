import {
    Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { Trans } from 'gen/ts/trans';
import { PropertyGroup } from 'gen/ts/prop_group';
import { PropertyEntity } from '../property/property.entity';

@Entity('propertygroup')
export class PropertyGroupEntity implements PropertyGroup {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    title: Trans;

    @Column({ unique: true })
    altName: string;

    @Column({ nullable: true })
    comment: string;

    @Column({ default: false })
    isPrimary: boolean;

    @OneToMany(() => PropertyEntity, ({ propertygroup }) => propertygroup, { eager: true })
    properties: PropertyEntity[];
}
