import { Module } from "@nestjs/common";

import EventService from "./event.service";
import ConfigModule from "@common/config/config.module";

@Module({
    imports: [ConfigModule],
    providers: [EventService],
    exports: [EventService],
})
export default class EventModule { }
