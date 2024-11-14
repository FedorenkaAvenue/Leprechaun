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
import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from '@entities/Product';
import { CategoryI, CategoryPreviewI } from '@interfaces/Category';
import { PropertyGroupEntity, PropertyGroupPreviewEntity } from '@entities/PropertGroup';
import { TransI } from '@interfaces/Trans';
import { TransEntity } from './Trans';
import { PropertyGroupPreviewI } from '@interfaces/PropertyGroup';
import { ProductPreviewI } from '@interfaces/Product';

export class CategoryPreviewEntity implements CategoryPreviewI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    url: string;

    @OneToOne(() => TransEntity, { cascade: true, eager: true })
    @JoinColumn({ name: 'title', referencedColumnName: 'id' })
    @ApiProperty({ type: TransEntity })
    title: TransI;

    @Column({ nullable: true })
    @ApiProperty()
    icon: string;

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @Column({ default: false })
    @ApiProperty()
    is_public: boolean;
}

@Entity('category')
export class CategoryEntity extends CategoryPreviewEntity implements CategoryI {
    @OneToMany(() => ProductEntity, ({ category }) => category)
    @ApiProperty({ type: () => ProductEntity, isArray: true })
    products: ProductPreviewI[];

    @ManyToMany(() => PropertyGroupEntity, ({ id }) => id)
    @JoinTable({
        name: '_categories_to_propertygroups',
        inverseJoinColumn: {
            name: 'category_id',
            referencedColumnName: 'id',
        },
        joinColumn: {
            name: 'propertygroup_id',
            referencedColumnName: 'id',
        },
    })
    @ApiProperty({ type: () => PropertyGroupPreviewEntity, isArray: true })
    propertygroups: PropertyGroupPreviewI[];
}
