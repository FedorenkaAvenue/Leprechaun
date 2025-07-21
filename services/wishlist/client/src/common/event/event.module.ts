import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { EventService } from "./event.service";
import ConfigService from "@common/config/config.service";
import ConfigModule from "@common/config/config.module";

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                imports: [ConfigModule],
                name: 'KAFKA_SERVICE',
                inject: [ConfigService],
                useFactory: (configService: ConfigService) => ({
                    transport: Transport.KAFKA,
                    options: {
                        ...configService.getKafkaConnectionData(),
                    },
                }),
            },
        ]),
    ],
    providers: [EventService],
    exports: [EventService, ClientsModule],
})
export default class EventModule { }
