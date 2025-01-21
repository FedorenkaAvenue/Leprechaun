import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

import { SubscribeProductI } from "@interfaces/Subscribe";
import { ProductI } from "@interfaces/Product";
import SessionEntity from "./Session";
import { ProductEntity } from "./Product";

@Entity('notify_product')
@Index('product_email_UNIQUE', ['email', 'product'], { unique: true })
export default class SubscribeProductEntity implements SubscribeProductI {
    @PrimaryGeneratedColumn('increment')
    @ApiProperty({ required: true })
    id: string;

    @ManyToOne(() => SessionEntity, ({ sid }) => sid, { onDelete: 'CASCADE' })
    @ApiProperty({ description: 'session ID' })
    sid: string;

    @Column({ nullable: true })
    @ApiProperty({ description: 'user e-mail. empty if user is sign-ed' })
    email: string;

    @ManyToOne(() => ProductEntity, ({ id }) => id, { onDelete: 'CASCADE' })
    @ApiProperty({ description: 'product' })
    product: ProductI;
}
