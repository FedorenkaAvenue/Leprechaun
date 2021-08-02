import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { IProduct } from "./index.interface";

@Entity('product')
export class ProductEntity implements IProduct {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    title: string;

    @Column()
    @ApiProperty()
    price: number;

    // @ApiProperty({ required: false })
    // @Column({ array: true, nullable: true })
    // labels: IProductLabel[] | null;

    // @Column({ array: true })
    // @ApiProperty({ required: false })
    // properties: IProductProperty[];

    // @Column({ array: true, nullable: true })
    // @ApiProperty({ required: false })
    // images: string[];
}
