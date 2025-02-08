import { Body, Controller, Get, Post, Session, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiCookieAuth, ApiNotAcceptableResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import SubscribeProductService from "./subscribeProduct.service";
import { ProductStatusSubscriptionI } from "./subscribeProduct.interface";
import { SubscribeProductStatusDTO } from "./subscribeProduct.dto";
import { SessionInitInterceptor } from "@core/session/session.interceptor";
import { ProductStatus } from "@core/product/product.enum";
import { QueriesCommonI } from "@core/queries/queries.interface";
import QueryDecorator from '@core/queries/query.decorator';

@Controller('subscribe')
@ApiTags('Subscribe')
export default class SubscribeProductController {
    constructor(private readonly subscribeService: SubscribeProductService) { }

    @Get('/product')
    @ApiCookieAuth()
    @ApiOperation({ summary: `get subscriptions on product\'s statuses` })
    @ApiOkResponse({ type: 'string', isArray: true })
    private async getProductStatusSubscriptions(
        @Session() { id }: Record<string, any>,
    ): Promise<ProductStatusSubscriptionI[]> {
        return this.subscribeService.getProductStatusSubscriptions(id);
    }

    @Post('/product')
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: `subscribe on product available status (№ ${ProductStatus.AVAILABLE}) 🧷` })
    @ApiBody({ type: SubscribeProductStatusDTO })
    @ApiNotAcceptableResponse({ description: 'this email already subscribed on this product' })
    private async subscribeProductStatus(
        @Body(new ValidationPipe({ transform: true })) body: SubscribeProductStatusDTO,
        @Session() { id }: Record<string, any>,
        @QueryDecorator() queries: QueriesCommonI,
    ): Promise<void> {
        return this.subscribeService.subscribeProductStatus(body, id, queries);
    }
}
