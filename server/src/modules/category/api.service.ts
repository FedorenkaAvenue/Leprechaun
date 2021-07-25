import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  getCategory(categoryName: string): string {
    return categoryName;
  }
}
