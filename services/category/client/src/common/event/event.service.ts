import { Injectable, OnModuleInit } from "@nestjs/common";
import * as amqp from 'amqplib';

import ConfigService from "@common/config/config.service";
import CategoryEntity from "src/category/category.entity";

@Injectable()
export default class EventService implements OnModuleInit {
    constructor(private readonly configService: ConfigService) { }

    private channel: amqp.Channel;

    async onModuleInit() {
        const conn = await amqp.connect(this.configService.getRMQConnectionData().urls[0]);
        this.channel = await conn.createChannel();
        await this.channel.assertExchange('entity.crud', 'topic', { durable: true });
    }

    async deleteCategory(data: CategoryEntity) {
        this.channel.publish(
            'entity.crud',
            'category.deleted',
            Buffer.from(JSON.stringify({ pattern: 'category.deleted', data }))
        );
    }
}
