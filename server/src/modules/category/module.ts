import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './controller';
import { CategoryEntity } from './entity';
import { CategoryService } from './service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ CategoryEntity ])
  ],
  controllers: [ CategoryController ],
  providers: [ CategoryService ],
})
export class CategoryModule {}
