import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductController } from './index.controller';
import { ProductEntity } from './index.entity';
import { ProductService } from './index.service';

@Module({
	imports: [ TypeOrmModule.forFeature([ProductEntity]) ],
	controllers: [ ProductController ],
	providers: [ ProductService ],
})
export class ProductModule {}
