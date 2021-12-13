import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { CategoryPublicDTO, CreateCategoryDTO, CreateCategoryDTOСonstructor } from '@dto/Category';
import { FOLDER_TYPES, FSService } from '@services/FS';
import { ICategory, ICategoryPublic } from '@interfaces/Category';

@Injectable()
export class CategoryService {
	constructor(
		@InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
		private readonly multerModule: FSService
	) {}

	async getPublicCategories(): Promise<ICategoryPublic[]> {
		const res = await this.categoryRepo.find({
			where: { is_public: true }
		});

		return res.map(cat => new CategoryPublicDTO(cat));
	}

	async getPublicCategory(categoryUrl: string): Promise<ICategoryPublic> {
		try {
			const res = await this.categoryRepo.findOneOrFail({
				where: { url: categoryUrl, is_public: true }
			});

			return new CategoryPublicDTO(res);
		} catch(err) {
			throw new NotFoundException('category not found');
		}
	}

	getAdminCategories(): Promise<ICategory[]> {
		return this.categoryRepo.find({
			relations: ['property_groups']
		});
	}

	getAdminCategory(categoryUrl: string): Promise<ICategory> {
		return this.categoryRepo.findOne({
			where: { url: categoryUrl },
			relations: ['property_groups']
		});
	}

	async createCategory(newCategory: CreateCategoryDTO, icon: Express.Multer.File): Promise<void> {
		const { id } = await this.categoryRepo.save(new CreateCategoryDTOСonstructor(newCategory));

		if (icon) {
			const [ uploadedIcon ] = await this.multerModule.saveFiles(
				FOLDER_TYPES.CATEGORY,
				id,
				[ icon ]
			);

			await this.categoryRepo.update(
				{ id },
				{ icon: uploadedIcon }
			);
		}
	}

	async deleteCategory(categoryId: number): Promise<DeleteResult> {
		const res = await this.categoryRepo.delete({ id: categoryId });

		this.multerModule.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

		return res;
	}
}
