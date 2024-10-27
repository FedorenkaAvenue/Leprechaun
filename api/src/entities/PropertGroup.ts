import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';

import { PropertyEntity } from './Property';
import { PropertyGroupI, PropertyGroupPreviewI } from '@interfaces/PropertyGroup';
import { TransI } from '@interfaces/Trans';
import { TransEntity } from './Trans';
import { CategoryEntity, CategoryPreviewEntity } from './Category';
import { CategoryPreviewI } from '@interfaces/Category';

export class PropertyGroupPreviewEntity implements PropertyGroupPreviewI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

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
}

@Entity('propertygroup')
export class PropertyGroupEntity extends PropertyGroupPreviewEntity implements PropertyGroupI {
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
    @ApiProperty({ type: () => CategoryPreviewEntity, isArray: true })
    categories: CategoryPreviewI[];
}
