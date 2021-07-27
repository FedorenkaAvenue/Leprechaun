import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('category')
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isMain: boolean;

    @Column({ unique: true })
    title: string;

    @Column({ unique: true })
    url: string;

    @Column({ nullable: true })
    icon: string;

    @Column({ nullable: true })
    children: string;
}
