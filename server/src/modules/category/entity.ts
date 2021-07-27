import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { ICategory } from "./interface";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: 'body' })
    body: string;

    @Column({ default: 'create at))' })
    createAt: string;
}
