import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderEntity } from '@entities/Order';
import { OrderService } from '@services/Order';

@Module({
	imports: [
		TypeOrmModule.forFeature([ OrderEntity ])
	],
	providers: [ OrderService ],
	exports: [ OrderService ]
})
export class OrderModule {}