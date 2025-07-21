import { Injectable, OnModuleInit } from "@nestjs/common";
import * as amqp from 'amqplib';
import { EventHistoryProduct } from '@fedorenkaavenue/leprechaun_lib_entities/types/events';

import ConfigService from "@common/config/config.service";
import { ProductEntity } from "src/product/product.entity";

@Injectable()
export default class EventService implements OnModuleInit {
    constructor(private readonly configService: ConfigService) { }

    private channel: amqp.Channel;

    async onModuleInit() {
        const conn = await amqp.connect(this.configService.getRMQConnectionData().urls[0]);
        this.channel = await conn.createChannel();

        await Promise.all([
            this.channel.assertExchange('entity.crud', 'topic', { durable: true }),
            this.channel.assertExchange('product.visit', 'fanout', { durable: true }),
        ]);
    }

    emitDeleteProduct(data: ProductEntity) {
        this.channel.publish(
            'entity.crud',
            'product.deleted',
            Buffer.from(JSON.stringify({ pattern: 'product.deleted', data }))
        );
    }

    emitVisiteProduct({ user, product }: EventHistoryProduct) {
        this.channel.publish(
            'product.visit',
            '',
            Buffer.from(JSON.stringify({
                pattern: 'product.visited',
                data: { user, product },
            }))
        );
    }
}
