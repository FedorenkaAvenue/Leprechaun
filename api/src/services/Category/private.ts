import { DeleteResult, UpdateResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { FOLDER_TYPES } from '@services/FS';
import { CategoryI, CategoryPreviewI } from '@interfaces/Category';
import CategoryService from '.';
import { Category, CategoryCreateDTO, CategoryUpdateDTO } from '@dto/Category/private';

@Injectable()
export default class CategoryPrivateService extends CategoryService {
    getCategoryList(): Promise<CategoryPreviewI[]> {
        return this.categoryRepo.find({
            order: {
                created_at: 'DESC',
            },
        });
    }

    public async createCategory(newCategory: CategoryCreateDTO, icon: Express.Multer.File): Promise<CategoryI> {
        // TODO refactoring
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

            return await this.categoryRepo.findOneByOrFail({ id });
        } catch (err) {
            throw new BadRequestException(
                //@ts-ignore
                err.code == 23505
                    ? `category with url "${newCategory.url}" already exist`
                    : err
            );
        }
    }

    public async getCategory(categoryUrl: CategoryI['url']): Promise<CategoryI | null> {
        return await this.categoryRepo.findOne({
            where: { url: categoryUrl },
            relations: { propertygroups: true, products: true }
        });
    }

    public async updateCategory(categoryId: CategoryI['id'], updates: CategoryUpdateDTO): Promise<UpdateResult> {
        return await this.categoryRepo.update({ id: categoryId }, updates);
    }

    public async deleteCategory(categoryId: CategoryI['id']): Promise<DeleteResult> {
        const res = await this.categoryRepo.delete({ id: categoryId });

        this.FSService.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

        return res;
    }
}
