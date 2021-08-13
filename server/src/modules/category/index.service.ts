import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoryEntity } from './index.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './index.dto';
import { ProductEntity } from '@modules/product/index.entity';
import { FOLDER_TYPES, MulterService } from '@services/Multer';

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
		@InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
		private readonly multerModule: MulterService
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

	async createCategory(newCategory: CreateCategoryDTO, icon: Express.Multer.File): Promise<CategoryEntity> {
		const category = await this.categoryRepo.save(newCategory);
		const [ uploadedIcon ] = await this.multerModule.saveFiles(FOLDER_TYPES.CATEGORY, category.id, [ icon ]);
		await this.categoryRepo.update(
			{ id: category.id },
			{ icon: uploadedIcon }
		);

		return ({ ...category, icon: uploadedIcon });
	}

	updateCategory(category: UpdateCategoryDTO): Promise<UpdateResult> {
		return this.categoryRepo.update(
			{ id: category.id },
			category
		);
	}

	async deleteCategory(categoryId: number): Promise<DeleteResult> {
		const res = await this.categoryRepo.delete({ id: categoryId });
		this.multerModule.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

		return res;
	}
}
