import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { HistoryProductI } from './historyProduct.interface';
import { ProductEntity } from '@core/product/product.entity';
import SessionEntity from '@core/session/session.entity';

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
