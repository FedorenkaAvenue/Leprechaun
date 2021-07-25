import { Module } from '@nestjs/common';
import { CategoryController } from './api.controller';
import { CategoryService } from './api.service';

@Module({
  controllers: [ CategoryController ],
  providers: [ CategoryService ],
})
export class CategoryModule {}
