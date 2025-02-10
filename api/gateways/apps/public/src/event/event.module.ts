import { Module } from "@nestjs/common";
import { ClientsModule } from "@nestjs/microservices";

import EventService from "./event.service";
import ConfigModule from "@core/config/config.module";
import ConfigService from "@core/config/config.service";
import { EventQueue } from '@core/event/event.enum';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'WS',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: (config: ConfigService) => config.getBrokerMessageNetConfig({
                    queue: EventQueue.WS,
                    queueOptions: { durable: false },
                }),
            },
        ]),
    ],
    providers: [EventService],
    exports: [EventService],
})
export default class EventModule { }
