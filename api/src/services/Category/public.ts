import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryI } from '@interfaces/Category';
import { CategoryPublic } from '@dto/Category/constructor';
import CategoryService from '.';
import { QueriesCommon } from '@dto/Queries/constructor';

@Injectable()
export default class CategoryPublicService extends CategoryService {
    async getCategoryList({ lang }: QueriesCommon): Promise<CategoryPublic[]> {
        const res = await this.categoryRepo.find({
            where: { is_public: true },
        });

        return res.map(cat => new CategoryPublic(cat, lang));
    }

    async getCategory(categoryUrl: CategoryI['url'], { lang }: QueriesCommon): Promise<CategoryPublic> {
        try {
            const res = await this.categoryRepo.findOneOrFail({
                where: { url: categoryUrl, is_public: true },
            });

            return new CategoryPublic(res, lang);
        } catch (err) {
            throw new NotFoundException('category not found');
        }
    }
}
