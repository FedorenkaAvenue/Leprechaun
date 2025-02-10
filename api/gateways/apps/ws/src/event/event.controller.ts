import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

import { EventService } from "./event.service";
import { Event } from '@core/event/event.enum';
import { EventHistoryProductPushDTO } from '@core/event/event.dto';

@Controller()
export default class EventController {
    constructor(private readonly eventService: EventService) { }

    @MessagePattern(Event.HISTORY_PRODUCT_PUSH)
    pushProductToHistory(data: EventHistoryProductPushDTO<any>): void {
        this.eventService.pushToProductHistory(data);
    }
}
