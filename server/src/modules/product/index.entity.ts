import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { CategoryEntity } from "@modules/category/index.entity";
import { IProduct } from "./index.interface";

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
    @ApiProperty({ required: true })
    price: number;

    @Column({
        type: 'text',
        array: true,
        nullable: true
    })
    @ApiProperty({ required: false })
    images: string[]
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
    category: CategoryEntity;
}
