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
import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { TransI } from '@interfaces/Trans';
import { TransEntity } from './Trans';
import { CategoryEntity } from './Category';

@Entity('propertygroup')
export class PropertyGroupEntity implements PropertyGroupI {
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
    @ApiProperty({ type: () => PropertyEntity, isArray: true, required: false })
    properties: PropertyEntity[];

    @Column({ default: false })
    @ApiProperty({ description: 'visible property for ProductCard' })
    is_primary: boolean;

    @ManyToMany(() => CategoryEntity, ({ id }) => id)
    @JoinTable({
        name: '_categories_to_propertygroups',
        joinColumn: {
            name: 'propertygroup_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id',
        },
    })
    categories: CategoryEntity[];
}
