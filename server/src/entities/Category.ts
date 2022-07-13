import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from '@entities/Product';
import { ICategory, ICategoryBase } from '@interfaces/Category';
import { ProductGroupBaseEntity, PropertyGroupEntity } from '@entities/PropertGroup';

export class CategoryBaseEntity implements ICategoryBase {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    url: string;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ nullable: true })
    @ApiProperty()
    icon: string;
}

@Entity('category')
export class CategoryEntity extends CategoryBaseEntity implements ICategory {
    @OneToMany(() => ProductEntity, ({ category }) => category)
    @ApiProperty({ type: ProductEntity, isArray: true })
    products: ProductEntity[];

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
        isArray: true
    })
    property_groups: PropertyGroupEntity[];

    @Column({ nullable: true })
    @ApiProperty()
    comment: string;

    @Column({ default: false })
    @ApiProperty()
    is_public: boolean;
}
