import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './index.controller';
import { CategoryEntity } from './index.entity';
import { CategoryService } from './index.service';

@Module({
	imports: [ TypeOrmModule.forFeature([CategoryEntity]) ],
	controllers: [ CategoryController ],
	providers: [ CategoryService ],
})
export class CategoryModule {}
