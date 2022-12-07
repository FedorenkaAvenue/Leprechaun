import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CreateCategoryDTO } from '@dto/Category';
import { FOLDER_TYPES } from '@services/FS';
import { CategoryI } from '@interfaces/Category';
import { Category } from '@dto/Category/constructor';
import CategoryService from '.';
import { CategoryEntity } from '@entities/Category';

@Injectable()
export default class CategoryPrivateService extends CategoryService {
    getAdminCategories(): Promise<CategoryEntity[]> {
        return this.categoryRepo.find({
            relations: ['propertygroups'],
        });
    }

    async createCategory(newCategory: CreateCategoryDTO, icon: Express.Multer.File): Promise<void> {
        const { id } = await this.categoryRepo.save(new Category(newCategory));

        if (icon) {
            const [uploadedIcon] = await this.FSService.saveFiles(FOLDER_TYPES.CATEGORY, id, [icon]);

            await this.categoryRepo.update({ id }, { icon: uploadedIcon });
        }
    }

    async getCategory(categoryUrl: CategoryI['url']): Promise<CategoryEntity> {
        return await this.categoryRepo.findOne({
            where: { url: categoryUrl },
            relations: ['propertygroups'],
        });
    }

    async deleteCategory(categoryId: CategoryI['id']): Promise<DeleteResult> {
        const res = await this.categoryRepo.delete({ id: categoryId });

        this.FSService.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

        return res;
    }
}
