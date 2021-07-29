import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    parentCategoryId: number;

    @Column({ unique: true })
    title: string;

    @Column({ unique: true })
    url: string;

    @Column({ nullable: true })
    icon: string;

    @Column({ nullable: true })
    children: string;
}
