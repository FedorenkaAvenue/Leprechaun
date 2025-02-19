import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { ProductHistoryI } from './productHistory.interface';
import SessionEntity from '../session/session.entity';
import { ProductEntity } from '../product/product.entity';

@Entity('product_history')
@Index('product_UNIQUE', ['sid', 'product'], { unique: true })
export default class ProductHistoryEntity implements ProductHistoryI {
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
