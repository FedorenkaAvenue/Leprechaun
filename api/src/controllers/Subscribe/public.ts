import { Body, Controller, Get, Post, Session, UseGuards, UseInterceptors, ValidationPipe } from "@nestjs/common";
import { ApiBody, ApiCookieAuth, ApiNotAcceptableResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import SubscribePublicService from "@services/Subscribe/public";
import { SubscribeProductStatusDTO } from "@dto/Subscribe/public";
import { ProductStatus } from "@enums/Product";
import AuthSessionGuard from "@guards/Auth";
import SessionInitInterceptor from "@interceptors/SessionInit";
import { ProductStatusSubscriptionI } from "@interfaces/Subscribe";
import Queries from '@decorators/Query';
import { QueriesCommonI } from "@interfaces/Queries";

@Controller('subscribe')
@ApiTags('Subscribe 🧑‍💻')
export default class SubscribePublicController {
    constructor(private readonly subscribeService: SubscribePublicService) { }

    @Get('/product')
    @UseGuards(AuthSessionGuard)
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
        @Queries() queries: QueriesCommonI,
    ): Promise<void> {
        return this.subscribeService.subscribeProductStatus(body, id, queries);
    }
}
