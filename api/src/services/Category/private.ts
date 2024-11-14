import { DeleteResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { FOLDER_TYPES } from '@services/FS';
import { CategoryI } from '@interfaces/Category';
import CategoryService from '.';
import { CategoryEntity, CategoryPreviewEntity } from '@entities/Category';
import { Category, CreateCategoryDTO } from '@dto/Category/private';

@Injectable()
export default class CategoryPrivateService extends CategoryService {
    getCategoryList(): Promise<CategoryPreviewEntity[]> {
        return this.categoryRepo.find();
    }

    public async createCategory(newCategory: CreateCategoryDTO, icon: Express.Multer.File): Promise<CategoryEntity> {
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
            throw new BadRequestException(err?.detail);
        }
    }

    // async updateCategory(
    //     id: CategoryI['id'],
    //     data: CreateCategoryDTO,
    //     icon: Express.Multer.File,
    // ): Promise<UpdateResult> {
    //     const res =  await this.categoryRepo.update({ id }, { ...data });

    //     if (icon) {
    //         const [uploadedIcon] = await this.FSService.saveFiles(FOLDER_TYPES.CATEGORY, id, [icon]);

    //         await this.categoryRepo.update({ id }, { icon: uploadedIcon });
    //     }

    //     return res;
    // }

    public async getCategory(categoryUrl: CategoryI['url']): Promise<CategoryEntity> {
        return await this.categoryRepo.findOne({
            where: { url: categoryUrl },
            relations: { propertygroups: true, products: true }
        });
    }

    public async deleteCategory(categoryId: CategoryI['id']): Promise<DeleteResult> {
        const res = await this.categoryRepo.delete({ id: categoryId });

        this.FSService.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

        return res;
    }
}
