import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './entity';
import { ICategory } from './interface';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepo: Repository<CategoryEntity>
	) {}
	// getCategory(categoryName: string): string {
	// 	return categoryName;
	// }

	createCategory(newCategory: ICategory) {
		return this.categoryRepo.save(newCategory);
	}
}
