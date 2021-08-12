import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { ProductEntity } from "@modules/product/index.entity";
import { ICategory } from "./index.interface";

export class CategoryBaseEntity implements ICategory {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty()
    id: number;

    @Column({ unique: true })
    @ApiProperty()
    url: string;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ default: true })
    @ApiProperty()
    isPublic: boolean;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    icon: string;
}

@Entity('category')
export class CategoryEntity extends CategoryBaseEntity implements ICategory {
    @OneToMany(() => ProductEntity, ({ category }) => category)
    // @ApiProperty({ type: ProductEntity, isArray: true })
    products: ProductEntity[]
}
