import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoryEntity } from './index.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './index.dto';
import { ProductEntity } from '@modules/product/index.entity';

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

	getCategory(categoryUrl: string): Promise<CategoryEntity> {
		return this.categoryRepo.findOne({ url: categoryUrl });
	}

	//! переделать нахуй
	async getCategoryProducts(categoryUrl: string): Promise<ProductEntity[]> {
		try {
			const { products } = await this.categoryRepo.findOne({
				where: { url: categoryUrl },
				relations: ['products']
			});

			return products;
		} catch(err) {
			throw new NotFoundException();
		}
	}

	createCategory(newCategory: CreateCategoryDTO): Promise<CategoryEntity> {
		return this.categoryRepo.save(newCategory);
	}

	updateCategory(category: UpdateCategoryDTO): Promise<UpdateResult> {
		return this.categoryRepo.update(
			{ id: category.id },
			category
		);
	}

	deleteCategory(categoryUrl: string): Promise<DeleteResult> {
		return this.categoryRepo.delete({ url: categoryUrl });
	}
}
