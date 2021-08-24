import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoryEntity } from './index.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './index.dto';
import { FOLDER_TYPES, MulterService } from '@services/Multer';
import { IProduct } from '@modules/product/index.interface';

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
		return this.categoryRepo.findOne({url: categoryUrl });
	}

	async createCategory(categoryDTO: CreateCategoryDTO, icon: Express.Multer.File): Promise<void> {
		const category = await this.categoryRepo.save({
			...categoryDTO,
			filterGroups: categoryDTO.filterGroups.map((filterId: number ) => ({ id: filterId }))
		});
		let uploadedIcon: string | null = null;

		if (icon) uploadedIcon = await this.multerModule.saveFiles(FOLDER_TYPES.CATEGORY, category.id, [ icon ])[0];

		await this.categoryRepo.update(
			{ id: category.id },
			{ icon: uploadedIcon }
		);
	}

	// ! переделать нахуй
	async getCategoryProducts(categoryUrl: string): Promise<IProduct[]> {
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

	//TODO: группы фильтров
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
