import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { CategoryModule } from './modules/category/api.module';

@Module({
  imports: [
    CategoryModule,
    RouterModule.register(
      [
        {
          path: 'category',
          module: CategoryModule
        }
      ]
    )
  ]
})
export class AppModule {}
