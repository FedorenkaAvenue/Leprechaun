import { Module } from "@nestjs/common";

import EventController from "./event.controller";
import { EventGateway } from "./event.gateway";
import { EventService } from "./event.service";

@Module({
    controllers: [EventController],
    providers: [EventGateway, EventService],
})
export default class EventModule { }
