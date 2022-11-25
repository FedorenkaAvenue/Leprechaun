import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { HistoryI } from '@interfaces/History';
import { ProductEntity } from './Product';
import SessionEntity from './Session';

@Entity('history')
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
