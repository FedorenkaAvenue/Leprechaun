import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { CategoryEntity } from "@modules/category/index.entity";
import { IProduct } from "./index.interface";
import { ImageEntity } from "@modules/image/index.entity";
import { ICategory } from "@modules/category/index.interface";

export class ProductBaseEntity implements IProduct {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty({ required: true })
    title: string;

    @Column({ default: true })
    @ApiProperty({ required: false })
    isPublic: boolean;

    @Column()
    @ApiProperty()
    price: number;

    @OneToMany(
        () => ImageEntity,
        ({ product }) => product,
        { eager: true }
    )
    @ApiProperty()
    images: string[];
}

@Entity('product')
export class ProductEntity extends ProductBaseEntity implements IProduct {
    @ManyToOne(
        () => CategoryEntity,
        ({ products }) => products,
        { onDelete: 'CASCADE', eager: true }
    )
    @JoinColumn({ name: "category", referencedColumnName: 'id' })
    @ApiProperty({ type: () => CategoryEntity })
    category: ICategory;
}
