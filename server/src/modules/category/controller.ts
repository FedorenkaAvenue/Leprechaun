import { Controller, Get, Put, Param, HttpCode, Body } from '@nestjs/common';
import { CategoryService } from './service';

import { ICategory } from './interface';

@Controller()
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  // @Get()
  // getMainCategories(): string {
  //   return 'main categories';
  // }

  // @Get(':category')
  // getCategory(@Param('category') category: string): string {
  //   return this.categoryService.getCategory(category);
  // }

  @Put()
  @HttpCode(201)
  addCategory(@Body() body: ICategory) {
    return this.service.createCategory(body);
  }
}
