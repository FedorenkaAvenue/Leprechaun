import { Column, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { History } from '@fedorenkaavenue/leprechaun_lib_entities/server/history';
import { Product } from '@fedorenkaavenue/leprechaun_lib_entities/server/product';
import { User } from '@fedorenkaavenue/leprechaun_lib_entities/server/user';

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
