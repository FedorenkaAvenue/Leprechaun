import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoryEntity } from './index.entity';
import { CreateCategoryDTO, UpdateCategoryDTO } from './index.dto';
import { FOLDER_TYPES, MulterService } from '@services/Multer';
import { SearchResult } from '@dto/search';
import { IPaginationOptions } from '@interface/search';

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
			relations: ['filterGroups']
		});
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

	async getCategoryProducts(categoryUrl: string, { page, limit }: IPaginationOptions): Promise<SearchResult> {
		// check if category is exist
		try {
			await this.categoryRepo.findOneOrFail({ url: categoryUrl });
		} catch(err) {
			throw new NotFoundException();
		}

		const [ result, count ] = await this.categoryRepo.findAndCount({
			where: { url: categoryUrl },
			take: limit,
			skip: (page - 1) * limit,
			relations: ['products']
		});

		return new SearchResult(page, count, result.map(({ products }) => products));
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
