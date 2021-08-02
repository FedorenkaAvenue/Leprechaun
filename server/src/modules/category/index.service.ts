import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CategoryEntity } from './index.entity';
import { CreateCategoryDTO } from './index.dto';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepo: Repository<CategoryEntity>
	) {}

	// getMainCategories(): Promise<CategoryEntity[]> {
	// 	return this.categoryRepo.find({ parentCategoryId: null });
	// }

	getAllCategories(): Promise<CategoryEntity[]> {
		return this.categoryRepo.find();
	}
}

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepo: Repository<CategoryEntity>
	) {}

	getCategory(category: string): Promise<CategoryEntity> {
		return isNaN(Number(category)) ?
			this.categoryRepo.findOne({ url: category }) :
			this.categoryRepo.findOne({ id: Number(category)})
	}

	createCategory(newCategory: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryRepo.save(newCategory);
	}

	updateCategory(category: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryRepo.save(category);
	}

	deleteCategory(categoryId: number): Promise<DeleteResult> {
		return this.categoryRepo.delete({ id: categoryId });
	}
}
