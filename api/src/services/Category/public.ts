import { Injectable, NotFoundException } from '@nestjs/common';

import { CategoryI } from '@interfaces/Category';
import CategoryService from '.';
import { QueriesCommon } from '@dto/Queries/constructor';
import { CategoryPublic } from '@dto/Category/public';

@Injectable()
export default class CategoryPublicService extends CategoryService {
    public async getCategoryList({ lang }: QueriesCommon): Promise<CategoryPublic[]> {
        const res = await this.categoryRepo.find({
            where: { is_public: true },
        });

        return res.map(cat => new CategoryPublic(cat, lang));
    }

    public async getCategory(categoryUrl: CategoryI['url'], { lang }: QueriesCommon): Promise<CategoryPublic> {
        try {
            const res = await this.categoryRepo.findOneOrFail({
                where: { url: categoryUrl, is_public: true },
            });

            return new CategoryPublic(res, lang);
        } catch (_) {
            throw new NotFoundException(`category ${categoryUrl} not found`);
        }
    }
}
