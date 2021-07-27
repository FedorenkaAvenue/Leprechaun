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
		return this.categoryRepo.find({ isMain: true });
	}

	getAllCategories(): Promise<CategoryEntity[]> {
		return this.categoryRepo.find();
	}

	getCategory(categoryUrl: string): Promise<CategoryEntity> {
		return this.categoryRepo.findOne({ url: categoryUrl });
	}

	createCategory(newCategory: ICategory): Promise<CategoryEntity> {
		return this.categoryRepo.save(newCategory);
	}
}
