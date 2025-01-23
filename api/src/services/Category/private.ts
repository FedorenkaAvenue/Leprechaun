import { DeleteResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { FOLDER_TYPES } from '@services/FS';
import { CategoryI, CategoryPreviewI } from '@interfaces/Category';
import CategoryService from '.';
import { Category, CreateCategoryDTO } from '@dto/Category/private';

@Injectable()
export default class CategoryPrivateService extends CategoryService {
    getCategoryList(): Promise<CategoryPreviewI[]> {
        return this.categoryRepo.find();
    }

    public async createCategory(newCategory: CreateCategoryDTO, icon: Express.Multer.File): Promise<CategoryI> {
        try {
            const createdCategory = await this.categoryRepo.save(new Category(newCategory));
            const {
                id,
                title: { id: _, ...titles },
            } = createdCategory;

            if (icon) {
                const [uploadedIcon] = await this.FSService.saveFiles(
                    FOLDER_TYPES.CATEGORY,
                    id, [icon]
                );

                await this.categoryRepo.update({ id }, { icon: uploadedIcon });
            }

            return createdCategory;
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    public async getCategory(categoryid: CategoryI['id']): Promise<CategoryI | null> {
        return await this.categoryRepo.findOne({
            where: { id: categoryid },
            relations: { propertygroups: true, products: true }
        });
    }

    public async deleteCategory(categoryId: CategoryI['id']): Promise<DeleteResult> {
        const res = await this.categoryRepo.delete({ id: categoryId });

        this.FSService.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

        return res;
    }
}
