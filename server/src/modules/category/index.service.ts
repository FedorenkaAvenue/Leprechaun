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

	//TODO
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

	getCategory(categoryUrl: string): Promise<CategoryEntity> {
		return this.categoryRepo.findOne({
			where: {
				url: categoryUrl
			},
			relations: ['products']
		})
	}

	createCategory(newCategory: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryRepo.save(newCategory);
	}

	deleteCategory(categoryUrl: string): Promise<DeleteResult> {
		return this.categoryRepo.delete({ url: categoryUrl });
	}
}
