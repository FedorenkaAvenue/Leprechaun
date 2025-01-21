import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { HistoryI } from '@interfaces/History';
import { ProductEntity } from './Product';
import SessionEntity from './Session';

@Entity('history')
@Index('product_history_UNIQUE', ['sid', 'product'], { unique: true })
export class HistoryEntity implements HistoryI {
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
