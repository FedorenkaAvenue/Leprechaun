import { DeleteResult } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CreateCategoryDTO } from '@dto/Category';
import { FOLDER_TYPES } from '@services/FS';
import { CategoryI } from '@interfaces/Category';
import { Category } from '@dto/Category/constructor';
import CategoryHelperService from './helper';

@Injectable()
export default class CategoryAdminService extends CategoryHelperService {
    getAdminCategories(): Promise<CategoryI[]> {
        return this.categoryRepo.find({
            relations: ['property_groups'],
        });
    }

    async createCategory(newCategory: CreateCategoryDTO, icon: Express.Multer.File): Promise<void> {
        const { id } = await this.categoryRepo.save(new Category(newCategory));

        if (icon) {
            const [uploadedIcon] = await this.FSService.saveFiles(FOLDER_TYPES.CATEGORY, id, [icon]);

            await this.categoryRepo.update({ id }, { icon: uploadedIcon });
        }
    }

    async getAdminCategory(categoryUrl: string): Promise<CategoryI> {
        return await this.categoryRepo.findOne({
            where: { url: categoryUrl },
            relations: ['property_groups'],
        });
    }

    async deleteCategory(categoryId: number): Promise<DeleteResult> {
        const res = await this.categoryRepo.delete({ id: categoryId });

        this.FSService.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

        return res;
    }
}
