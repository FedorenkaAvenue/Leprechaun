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
import { CategoryI } from '@interfaces/Category';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import { TransI } from '@interfaces/Trans';
import { TransEntity } from './Trans';

@Entity('category')
export class CategoryEntity implements CategoryI {
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

    @OneToMany(() => ProductEntity, ({ category }) => category)
    products: ProductEntity[];

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
    propertygroups: PropertyGroupEntity[];
}
