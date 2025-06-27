import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

import WishlistPublicModule from "./services/wishlist/wishlist.module";
import OrderPublicModule from "./services/order/order.module";
import CategoryPublicModule from "./services/category/category.module";
import HistoryPublicModule from "./services/history/history.module";
import ProductPublicModule from "./services/product/product.module";
import SubscriptionPublicModule from "./services/subscription/subscription.module";
import { SessionMiddleware } from "@public/shared/middlewares/session.middleware";

@Module({
    imports: [
        ProductPublicModule,
        WishlistPublicModule,
        OrderPublicModule,
        CategoryPublicModule,
        HistoryPublicModule,
        SubscriptionPublicModule,
    ],
})
export default class PublicModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(SessionMiddleware).forRoutes('*');
    }
}
