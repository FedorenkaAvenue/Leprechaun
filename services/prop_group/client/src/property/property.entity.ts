import {
    Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';

import { PropertyGroupEntity } from '../propertyGroup/propertyGroup.entity';
import { Property } from 'gen/_property';
import { PropertyGroup } from 'gen/property_group';

@Entity('property')
export class PropertyEntity implements Omit<Property, 'title'> {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column()
    title: number;

    @Column({ unique: true })
    altName: string;

    @Column({ nullable: true })
    comment: string;

    @ManyToOne(
        () => PropertyGroupEntity,
        ({ properties }) => properties, { onDelete: 'CASCADE', nullable: false }
    )
    @JoinColumn({ name: 'propertyGroup' })
    propertyGroup: PropertyGroup['id'];
}
