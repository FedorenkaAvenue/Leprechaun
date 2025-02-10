import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryPublicI } from './category.interface';
import { CategoryPublic } from './category.dto';
import CategoryEntity from '@core/category/category.entity';
import { QueriesCommonI } from '@core/queries/queries.interface';

@Injectable()
export default class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
    ) { }

    public async getCategoryList({ lang }: QueriesCommonI): Promise<CategoryPublicI[]> {
        const res = await this.categoryRepo.find({
            where: { is_public: true },
        });

        return res.map(cat => new CategoryPublic(cat, lang));
    }

    public async getCategory(id: CategoryPublicI['id'], { lang }: QueriesCommonI): Promise<CategoryPublicI | null> {
        const res = await this.categoryRepo.findOne({
            where: { id, is_public: true },
        });

        if (!res) return null;

        return new CategoryPublic(res, lang);
    }
}
