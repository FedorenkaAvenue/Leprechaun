import {
    Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { CategoryI } from './category.interface';
import { TransEntity } from '../trans/trans.entity';
import { TransI } from '../trans/trans.interface';
import { ProductEntity } from '../product/product.entity';
import { ProductPreviewI } from '../product/product.interface';
import { PropertyGroupI } from '../propertyGroup/propertyGroup.interface';
import { PropertyGroupEntity } from '../propertyGroup/propertyGroup.entity';

@Entity('category')
export default class CategoryEntity implements CategoryI {
    @PrimaryGeneratedColumn('rowid')
    @ApiProperty()
    id: number;

    @CreateDateColumn()
    @ApiProperty()
    created_at: Date;

    @UpdateDateColumn()
    @ApiProperty()
    updated_at: Date;

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

    @Column({ type: 'varchar', nullable: true })
    @ApiProperty()
    comment: string | null;

    @Column({ default: false })
    @ApiProperty()
    is_public: boolean;

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
    @ApiProperty({ type: () => PropertyGroupEntity, isArray: true })
    propertygroups: PropertyGroupI[];
}
