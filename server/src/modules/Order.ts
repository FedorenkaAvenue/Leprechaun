import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity, OrderItemEntity } from '@entities/Order';
import { OrderService } from '@services/Order';
import { OrderPublicController } from '@controllers/Order';

@Module({
	imports: [
		TypeOrmModule.forFeature([ OrderEntity, OrderItemEntity ])
	],
	controllers: [ OrderPublicController ],
	providers: [ OrderService ]
})
export default class OrderModule {}
