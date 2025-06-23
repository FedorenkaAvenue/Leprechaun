import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

import { Subscription } from "gen/subscription";
import { User } from "gen/user";
import { Product } from "gen/product";
import { TransData } from "gen/trans";

@Entity('subscription')
@Index('product_email_UNIQUE', ['email', 'product'], { unique: true })
export default class SubscriptionEntity implements Subscription {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({ type: 'varchar' })
    user: User['id'];

    @Column({ nullable: true })
    email: string;

    @Column({ type: 'varchar' })
    product: Product['id'];

    @Column({ type: 'varchar' })
    lang: keyof TransData;
}
