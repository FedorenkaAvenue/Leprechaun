import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { History } from 'gen/history';
import { Product } from 'gen/product';
import { User } from 'gen/user';

@Entity('history')
@Index('product_UNIQUE', ['user', 'product'], { unique: true })
export default class HistoryEntity implements Omit<History, 'product'> {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar' })
    user: User['id'];

    @Column({ type: 'varchar' })
    product: Product['id'];

    @UpdateDateColumn()
    createdAt: Date;
}
