import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ICategory } from "./index.interface";

@Entity('category')
export class CategoryEntity implements ICategory {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column({ nullable: true })
    @ApiProperty()
    parentCategoryId: number;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ unique: true })
    @ApiProperty()
    url: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    icon: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    children: string;
}
