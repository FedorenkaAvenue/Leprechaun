import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from '@entities/Product';
import { ICategory, ICategoryBase } from '@interfaces/Category';
import { ProductGroupBaseEntity, PropertyGroupEntity } from '@entities/PropertGroup';
import { IProduct } from '@interfaces/Product';
import { IPropertyGroup } from '@interfaces/PropertyGroup';

export class CategoryBaseEntity implements ICategoryBase {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty({ required: false })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ required: false })
    url: string;

    @Column({ unique: true })
    @ApiProperty({ required: false })
    title: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    icon: string;
}

@Entity('category')
export class CategoryEntity extends CategoryBaseEntity implements ICategory {
    @OneToMany(() => ProductEntity, ({ category }) => category)
    @ApiProperty({ type: ProductEntity, isArray: true })
    products: IProduct[];

    @ManyToMany(
        () => PropertyGroupEntity,
        ({ id }) => id,
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
    property_groups: IPropertyGroup[];

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    comment: string;

    @Column({ default: false })
    @ApiProperty({ required: false })
    is_public: boolean;
}
