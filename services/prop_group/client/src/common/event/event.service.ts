import { Injectable, OnModuleInit } from "@nestjs/common";
import * as amqp from 'amqplib';

import ConfigService from "@common/config/config.service";
import { PropertyGroupEntity } from "src/propertyGroup/propertyGroup.entity";

@Injectable()
export default class EventService implements OnModuleInit {
    constructor(private readonly configService: ConfigService) { }

    private channel: amqp.Channel;

    async onModuleInit() {
        const conn = await amqp.connect(this.configService.getRMQConnectionData().urls[0]);
        this.channel = await conn.createChannel();
        await this.channel.assertExchange('entity.crud', 'topic', { durable: true });
    }

    async deleteGroup(data: PropertyGroupEntity) {
        this.channel.publish(
            'entity.crud',
            'propgroup.deleted',
            Buffer.from(JSON.stringify({ pattern: 'propgroup.deleted', data }))
        );
    }
}
