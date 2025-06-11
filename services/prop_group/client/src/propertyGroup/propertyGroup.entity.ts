import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { PropertyGroup } from 'gen/ts/prop_group';
import { PropertyEntity } from '../property/property.entity';

@Entity('propertygroup')
export class PropertyGroupEntity implements Omit<PropertyGroup, 'title' | 'properties' | 'categories'> {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ unique: true })
    title: number;

    @Column({ unique: true })
    altName: string;

    @Column({ nullable: true })
    comment: string;

    @Column({ default: false })
    isPrimary: boolean;

    @OneToMany(() => PropertyEntity, ({ propertyGroup }) => propertyGroup, { eager: true })
    properties: PropertyEntity[];
}
