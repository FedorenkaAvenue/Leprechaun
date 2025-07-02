import { Product } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { Subscription } from "@fedorenkaavenue/leprechaun_lib_entities/server/subscription";
import { TransData } from "@fedorenkaavenue/leprechaun_lib_entities/server/trans";
import { User } from "@fedorenkaavenue/leprechaun_lib_entities/server/user";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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
