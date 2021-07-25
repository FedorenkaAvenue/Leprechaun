import { Controller, Get, Put, Param, HttpCode } from '@nestjs/common';
import { CategoryService } from './api.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getMainCategories(): string {
    return 'main categories';
  }

  @Get(':category')
  getCategory(@Param('category') category: string): string {
    return this.categoryService.getCategory(category);
  }

  @Put()
  @HttpCode(201)
  addCatagory() {

  }
}
