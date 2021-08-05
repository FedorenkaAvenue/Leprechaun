import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CategoryEntity } from "@modules/category/index.entity";
import { IProduct } from "./index.interface";

@Entity('product')
export class ProductEntity implements IProduct {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @Column()
    @ApiProperty({ required: true })
    title: string;

    @Column()
    @ApiProperty({ required: true })
    price: number;

    @ManyToOne(() => CategoryEntity, ({ products }) => products)
    @JoinColumn({ name: "category" })
    @ApiProperty({ type: () => CategoryEntity })
    category: CategoryEntity;
}
