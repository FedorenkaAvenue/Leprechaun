import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

import { ProductPreviewPublicI } from "../product/product.interface";
import { Event } from '@core/event/event.enum';
import { EventHistoryProductPushDTO } from '@core/event/event.dto';

@Injectable()
export default class EventService {
    constructor(@Inject('WS') private readonly client: ClientProxy) { }

    public async pushHistoryProduct(payload: EventHistoryProductPushDTO<ProductPreviewPublicI>) {
        this.client.emit(Event.HISTORY_PRODUCT_PUSH, payload);
    }
}
