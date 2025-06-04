import { ApiProperty } from '@nestjs/swagger';
import {
    Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

import { PropertyGroupI } from './propertyGroup.interface';
import { TransEntity } from '../trans/trans.entity';
import { TransI } from '../trans/trans.interface';
import { PropertyEntity } from '../property/property.entity';
import CategoryEntity from '../category/category.entity';
import { CategoryI } from '../category/category.interface';

@Entity('propertygroup')
export class PropertyGroupEntity implements PropertyGroupI {
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

    @OneToMany(() => PropertyEntity, ({ propertygroup }) => propertygroup, { eager: true })
    @ApiProperty({ type: () => PropertyEntity, isArray: true })
    properties: PropertyEntity[];

    @Column({ default: false })
    @ApiProperty({ description: 'visible property for ProductCard' })
    is_primary: boolean;

    @ManyToMany(() => CategoryEntity, ({ id }) => id)
    @JoinTable({
        name: '_categories_to_propertygroups',
        inverseJoinColumn: {
            name: 'propertygroup_id',
            referencedColumnName: 'id',
        },
        joinColumn: {
            name: 'category_id',
            referencedColumnName: 'id',
        },
    })
    @ApiProperty({ type: () => CategoryEntity, isArray: true })
    categories: CategoryI[];
}
