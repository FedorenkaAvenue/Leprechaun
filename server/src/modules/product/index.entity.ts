import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CategoryEntity } from "@modules/category/index.entity";
import { IProduct } from "./index.interface";

@Entity('product')
export class ProductEntity implements IProduct {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @ManyToOne(() => CategoryEntity, category => category.id)
    @JoinColumn({ name: "category" })
    @ApiProperty({ required: true })
    category: number;

    @Column()
    @ApiProperty({ required: true })
    title: string;

    @Column()
    @ApiProperty({ required: true })
    price: number;
}
