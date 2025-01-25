import { Injectable } from '@nestjs/common';

import { CategoryI, CategoryPublicI } from '@interfaces/Category';
import CategoryService from '.';
import { QueriesCommon } from '@dto/Queries';
import { CategoryPublic } from '@dto/Category/public';
import { QueriesCommonI } from '@interfaces/Queries';

@Injectable()
export default class CategoryPublicService extends CategoryService {
    public async getCategoryList({ lang }: QueriesCommon): Promise<CategoryPublicI[]> {
        const res = await this.categoryRepo.find({
            where: { is_public: true },
        });

        return res.map(cat => new CategoryPublic(cat, lang));
    }

    public async getCategory(id: CategoryI['id'], { lang }: QueriesCommonI): Promise<CategoryPublicI | null> {
        const res = await this.categoryRepo.findOne({
            where: { id, is_public: true },
        });

        if (!res) return null;

        return new CategoryPublic(res, lang);
    }
}
