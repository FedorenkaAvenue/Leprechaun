import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { EventService } from "./event.service";
import { Event } from './event.enum';
import { EventHistoryProductPushDTO } from './event.dto';

@Controller()
export default class EventController {
    constructor(private readonly eventService: EventService) { }

    @MessagePattern(Event.HISTORY_PRODUCT_PUSH)
    pushProductToHistory(data: EventHistoryProductPushDTO<any>): void {
        this.eventService.pushToProductHistory(data);
    }
}
