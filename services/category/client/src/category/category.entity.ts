import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Category } from 'gen/ts/category';

@Entity('category')
export default class CategoryEntity implements Omit<Category, 'title' | 'propertyGroups'> {
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

    @Column({ nullable: true, select: false })
    iconId: string;

    @Column({ type: 'varchar', nullable: true })
    comment: string;

    @Column({ default: false })
    isPublic: boolean;

    // @OneToMany(() => ProductEntity, ({ category }) => category)
    // products: ProductPreviewI[];

    @Column('int', { array: true, nullable: true })
    propertyGroups: number[];
}
