import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryI } from '@interfaces/Category';
import { CategoryPublic } from '@dto/Category/constructor';
import CategoryService from '.';
import { QueriesCommon } from '@dto/Queries/constructor';

@Injectable()
export default class CategoryPublicService extends CategoryService {
    async getCategoryList(searchParams: QueriesCommon): Promise<CategoryPublic[]> {
        const res = await this.categoryRepo.find({
            where: { is_public: true },
        });

        return res.map(cat => new CategoryPublic(cat, searchParams));
    }

    async getCategory(categoryUrl: CategoryI['url'], searchParams: QueriesCommon): Promise<CategoryPublic> {
        try {
            const res = await this.categoryRepo.findOneOrFail({
                where: { url: categoryUrl, is_public: true },
            });

            return new CategoryPublic(res, searchParams);
        } catch (err) {
            throw new NotFoundException('category not found');
        }
    }
}
