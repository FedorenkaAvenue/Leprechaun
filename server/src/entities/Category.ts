import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from '@entities/Product';
import { ICategory } from '@interfaces/Category';
import { ProductGroupBaseEntity, PropertyGroupEntity } from '@entities/Property';
import { IProduct } from '@interfaces/Product';
import { IPropertyGroup } from '@interfaces/Property';

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
    is_public: boolean;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    icon: string;

    @ManyToMany(
        () => PropertyGroupEntity,
        { cascade: true }
    )
    @JoinTable({
        name: '_categories_to_propertygroups',
        joinColumn: {
            name: 'category_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'propertygroup_id',
            referencedColumnName: 'id'
        }
    })
    @ApiProperty({
        type: ProductGroupBaseEntity,
        isArray: true,
        required: false
    })
    property_groups: IPropertyGroup[]
}

@Entity('category')
export class CategoryEntity extends CategoryBaseEntity implements ICategory {
    @OneToMany(() => ProductEntity, ({ category }) => category)
    @ApiProperty({ type: ProductEntity, isArray: true })
    products: IProduct[]
}