import { Injectable, OnModuleInit } from "@nestjs/common";
import * as amqp from 'amqplib';

import ConfigService from "@common/config/config.service";
import { ProductEntity } from "src/product/product.entity";

@Injectable()
export default class EventService implements OnModuleInit {
    constructor(private readonly configService: ConfigService) { }

    private channel: amqp.Channel;

    async onModuleInit() {
        const conn = await amqp.connect(this.configService.getRMQConnectionData().urls[0]);
        this.channel = await conn.createChannel();
        await this.channel.assertExchange('entity.crud', 'topic', { durable: true });
    }

    async deleteProduct(data: ProductEntity) {
        this.channel.publish(
            'entity.crud',
            'product.deleted',
            Buffer.from(JSON.stringify({ pattern: 'product.deleted', data }))
        );
    }
}
