import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryPublicI } from '@interfaces/Category';
import { CategoryPublic } from '@dto/Category/constructor';
import CategoryService from '.';

@Injectable()
export default class CategoryPublicService extends CategoryService {
    async getCategoryList(): Promise<CategoryPublicI[]> {
        const res = await this.categoryRepo.find({
            where: { is_public: true },
        });

        return res.map(cat => new CategoryPublic(cat));
    }

    async getCategory(categoryUrl: string): Promise<CategoryPublicI> {
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
