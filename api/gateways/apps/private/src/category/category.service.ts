import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoryPreviewI } from './category.interface';
import { Category, CategoryCreateDTO, CategoryUpdateDTO } from './category.dto';
import CategoryEntity from '@core/category/category.entity';
import { CategoryI } from '@core/category/category.interface';
import FSService from '@core/FS/FS.service';
import { FOLDER_TYPES } from '@core/FS/FS.enum';

@Injectable()
export default class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
        private readonly FSService: FSService,
    ) { }

    public async getCategoryList(): Promise<CategoryPreviewI[]> {
        return await this.categoryRepo.find({
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
