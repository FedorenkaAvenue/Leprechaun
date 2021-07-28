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

	getMainCategories(): Promise<CategoryEntity[]> {
		return this.categoryRepo.find({ parentCategoryId: null });
	}

	getAllCategories(): Promise<CategoryEntity[]> {
		return this.categoryRepo.find();
	}

	getCategory(category: string): Promise<CategoryEntity> {
		return isNaN(Number(category)) ?
			this.categoryRepo.findOne({ url: category }) :
			this.categoryRepo.findOne({ id: Number(category) });
	}

	createCategory(newCategory: ICategory): Promise<CategoryEntity> {
		return this.categoryRepo.save(newCategory);
	}

	deleteCategory(category: string) {
		return isNaN(Number(category)) ?
			this.categoryRepo.delete({ url: category }) :
			this.categoryRepo.delete({ id: Number(category) });
	}
}
