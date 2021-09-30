import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { CreateCategoryDTO, CreateCategoryDTOСonstructor } from '@dto/Category';
import { FOLDER_TYPES, MulterService } from '@services/Multer';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(CategoryEntity)
		private readonly categoryRepo: Repository<CategoryEntity>
	) {}

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
		return this.categoryRepo.findOne({
			where: { url: categoryUrl },
			relations: ['property_groups']
		});
	}

	async createCategory(newCategory: CreateCategoryDTO, icon: Express.Multer.File): Promise<void> {
		const { id } = await this.categoryRepo.save(new CreateCategoryDTOСonstructor(newCategory));

		if (icon) {
			const uploadedIcon = await this.multerModule.saveFiles(FOLDER_TYPES.CATEGORY, id, [ icon ])[0];

			await this.categoryRepo.update(
				{ id },
				{ icon: uploadedIcon }
			);
		}
	}

	// async updateCategory(category: UpdateCategoryDTO, icon: Express.Multer.File): Promise<UpdateResult> {	
	// 	const res = await this.categoryRepo.update(
	// 		{ id: category.id },
	// 		{ ...category }
	// 	);

	// 	// if (res.affected && icon) await this.multerModule.saveFiles(FOLDER_TYPES.CATEGORY, category.id, [ icon ]);

	// 	return res;
	// }

	async deleteCategory(categoryId: number): Promise<DeleteResult> {
		const res = await this.categoryRepo.delete({ id: categoryId });
		this.multerModule.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

		return res;
	}
}
