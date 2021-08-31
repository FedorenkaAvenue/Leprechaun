import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ProductEntity } from "@modules/product/index.entity";
import { ICategory } from "./index.interface";
import { FilterGroupBaseEntity, FilterGroupEntity } from "@modules/filter/index.entity";
import { IProduct } from "@modules/product/index.interface";
import { IFilterGroup } from "@modules/filter/index.interface";

export class CategoryBaseEntity implements ICategory {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    url: string;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ default: true })
    @ApiProperty()
    isPublic: boolean;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    icon: string;

    @ManyToMany(
        () => FilterGroupEntity,
        { cascade: true }
    )
    @JoinTable({
        name: '_categories_to_filtergroups',
        joinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'filter_group_id',
            referencedColumnName: 'id'
        }
    })
    @ApiProperty({
        type: FilterGroupBaseEntity,
        isArray: true,
        required: false
    })
    filterGroups: IFilterGroup[]
}

@Entity('category')
export class CategoryEntity extends CategoryBaseEntity implements ICategory {
    @OneToMany(() => ProductEntity, ({ category }) => category)
    @ApiProperty({ type: ProductEntity, isArray: true })
    products: IProduct[]
}
