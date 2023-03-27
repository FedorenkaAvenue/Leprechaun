import { DeleteResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateCategoryDTO } from '@dto/Category';
import { FOLDER_TYPES } from '@services/FS';
import { CategoryI } from '@interfaces/Category';
import { Category } from '@dto/Category/constructor';
import CategoryService from '.';
import { CategoryEntity } from '@entities/Category';
import { SEIndexesE } from '@enums/SE';
import { SECategoryI } from '@interfaces/SE';

@Injectable()
export default class CategoryPrivateService extends CategoryService {
    getCategoryList(): Promise<CategoryEntity[]> {
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
                    id, [ icon ]
                );

                await this.categoryRepo.update({ id }, { icon: uploadedIcon });
            }

            this.SEService.SE.index<SECategoryI>({
                index: SEIndexesE.CATEGORY,
                document: { id, title: titles }
            });

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
        });
    }

    public async deleteCategory(categoryId: CategoryI['id']): Promise<DeleteResult> {
        const res = await this.categoryRepo.delete({ id: categoryId });

        this.FSService.removeFolder(FOLDER_TYPES.CATEGORY, categoryId);

        return res;
    }
}
