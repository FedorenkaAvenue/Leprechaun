import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryPublicI } from '@interfaces/Category';
import { CategoryPublic } from '@dto/Category/constructor';
import CategoryAdminService from './admin';

@Injectable()
export class CategoryService extends CategoryAdminService {
    async getPublicCategories(): Promise<CategoryPublicI[]> {
        const res = await this.categoryRepo.find({
            where: { is_public: true },
        });

        return res.map(cat => new CategoryPublic(cat));
    }

    async getPublicCategory(categoryUrl: string): Promise<CategoryPublicI> {
        try {
            const res = await this.categoryRepo.findOneOrFail({
                where: { url: categoryUrl, is_public: true },
            });

            return new CategoryPublic(res);
        } catch (err) {
            throw new NotFoundException('category not found');
        }
    }
}
