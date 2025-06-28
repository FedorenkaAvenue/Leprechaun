import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import {
    ApiBody, ApiCookieAuth, ApiNotAcceptableResponse, ApiOkResponse, ApiOperation, ApiTags,
} from "@nestjs/swagger";

import SubscriptionService from "./subscription.service";
import { Product, ProductStatus } from "@gen/product";
import { UnknownUserResponce } from "@public/shared/guards/UnknownUserResponce.guard";
import Credentials from "@public/shared/decorators/credentials.decorator";
import { User } from "@gen/user";
import SessionInitInterceptor from "@public/shared/interceptors/sessionInit.interceptor";
import { SubscriptionProductStatusSchema } from "./subscription.schema";
import QueryDecorator from "@common/queries/query.decorator";
import { QueriesCommon } from "@common/queries/queries.dto";
import { Empty } from "@gen/google/protobuf/empty";

@Controller('subscription')
@ApiTags('Subscription 🧑‍💻')
export default class SubscriptionPublicController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Get()
    @UseGuards(UnknownUserResponce([]))
    @ApiCookieAuth()
    @ApiOperation({ summary: `get subscriptions on product\'s statuses` })
    @ApiOkResponse({ type: 'string', isArray: true })
    private async getProductStatusSubscriptions(@Credentials('userId') user: User['id']): Promise<Product['id'][]> {
        return this.subscriptionService.getSubscriptionListPublic(user);
    }

    @Post()
    @UseInterceptors(SessionInitInterceptor)
    @ApiOperation({ summary: `subscribe on product available status (№ ${ProductStatus.AVAILABLE_STATUS}) 🧷` })
    @ApiBody({ type: SubscriptionProductStatusSchema })
    @ApiNotAcceptableResponse({ description: 'this email already subscribed on this product' })
    private async subscribeProductStatus(
        @Body() body: SubscriptionProductStatusSchema,
        @Credentials('userId') user: User['id'],
        @QueryDecorator() queries: QueriesCommon,
    ): Promise<Empty> {
        return this.subscriptionService.subscribeProductStatus(body, user, queries);
    }
}
