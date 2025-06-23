import { Controller, Get } from "@nestjs/common";
import { ApiBody, ApiCookieAuth, ApiNotAcceptableResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import SubscriptionService from "./subscription.service";
import { Product } from "@gen/product";

@Controller('subscription')
@ApiTags('Subscription 🧑‍💻')
export default class SubscriptionPublicController {
    constructor(private readonly subscriptionService: SubscriptionService) { }

    @Get()
    @ApiCookieAuth()
    @ApiOperation({ summary: `get subscriptions on product\'s statuses` })
    @ApiOkResponse({ type: 'string', isArray: true })
    private async getProductStatusSubscriptions(): Promise<Product['id'][]> {
        return this.subscriptionService.getSubscriptionListPublic('asdasd');
    }

    // @Post()
    // @UseInterceptors(SessionInitInterceptor)
    // @ApiOperation({ summary: `subscribe on product available status (№ ${ProductStatus.AVAILABLE}) 🧷` })
    // @ApiBody({ type: SubscribeProductStatusDTO })
    // @ApiNotAcceptableResponse({ description: 'this email already subscribed on this product' })
    // private async subscribeProductStatus(
    //     @Body(new ValidationPipe({ transform: true })) body: SubscribeProductStatusDTO,
    //     @Session() { id }: Record<string, any>,
    //     @QueryDecorator() queries: QueriesCommonI,
    // ): Promise<void> {
    //     return this.subscriptionService.subscribeProductStatus(body, id, queries);
    // }
}
