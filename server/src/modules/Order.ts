import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderItemEntity } from '@entities/OrderItemEntity';
import { OrderService, OrderServiceNA } from '@services/Order';
import { OrderAdminController, OrderPublicController } from '@controllers/Order';

@Module({
	imports: [
		TypeOrmModule.forFeature([ OrderEntity, OrderItemEntity ])
	],
	controllers: [ OrderPublicController, OrderAdminController ],
	providers: [ OrderServiceNA, OrderService ]
})
export default class OrderModule {}
