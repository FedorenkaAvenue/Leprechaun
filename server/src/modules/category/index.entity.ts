import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import { ProductEntity } from "@modules/product/index.entity";
import { ICategory } from "./index.interface";

@Entity('category')
export class CategoryEntity implements ICategory {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    url: string;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    icon: string;

    @OneToMany(() => ProductEntity, product => product.id)
    @ApiProperty()
    products: ProductEntity[]
}
