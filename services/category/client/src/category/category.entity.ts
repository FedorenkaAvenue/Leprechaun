import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Category } from 'gen/category';

@Entity('category')
export default class CategoryEntity implements Omit<Category, 'title' | 'propertyGroups' | 'products'> {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ unique: true })
    url: string;

    @Column()
    title: number;

    @Column({ nullable: true })
    icon: string;

    @Column({ nullable: true })
    iconId: string;

    @Column({ type: 'varchar', nullable: true })
    comment: string;

    @Column({ default: false })
    isPublic: boolean;

    @Column('int', { array: true, nullable: true })
    propertyGroups: number[];
}
