import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

import { ICategory } from "./index.interface";

@Entity('category')
export class CategoryEntity implements ICategory {
    @PrimaryColumn()
    @ApiProperty()
    url: string;

    @Column({ unique: true })
    @ApiProperty()
    title: string;

    @Column({ nullable: true })
    @ApiProperty({ required: false })
    icon: string;

    // @Column({ unique: true })
    // @ApiProperty({ required: false })
    // parentCategoryId: number;

    // @Column({ nullable: true, array: true })
    // @ApiProperty({ required: false })
    // children: CategoryEntity[];
}
