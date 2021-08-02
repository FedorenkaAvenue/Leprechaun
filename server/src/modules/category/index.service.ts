import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './index.entity';
import { CreateCategoryDTO } from './index.dto';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepo: Repository<CategoryEntity>
	) {}

	// * categories

	getMainCategories(): Promise<CategoryEntity[]> {
		return this.categoryRepo.find({ parentCategoryId: null });
	}

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
			this.categoryRepo.findOne({ id: Number(category) });
	}

	createCategory(newCategory: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryRepo.save(newCategory);
	}

	updateCategory(category: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryRepo.save(category);
	}

	deleteCategory(category: string) {
		return isNaN(Number(category)) ?
			this.categoryRepo.delete({ url: category }) :
			this.categoryRepo.delete({ id: Number(category) });
	}
}
