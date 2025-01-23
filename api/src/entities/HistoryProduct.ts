import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ProductEntity } from './Product';
import SessionEntity from './Session';
import { HistoryProductI } from '@interfaces/HistoryProduct';

@Entity('history_product')
@Index('product_UNIQUE', ['sid', 'product'], { unique: true })
export class HistoryProductEntity implements HistoryProductI {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => SessionEntity, ({ sid }) => sid, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'sid', referencedColumnName: 'sid' })
    sid: string;

    @ManyToOne(() => ProductEntity, ({ id }) => id, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'product', referencedColumnName: 'id' })
    product: ProductEntity;

    @UpdateDateColumn()
    created_at: Date;
}
