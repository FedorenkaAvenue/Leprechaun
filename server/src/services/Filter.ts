import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { IPropertyGroup } from '@interfaces/PropertyGroup';

@Injectable()
export class FilterService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
    ) {}

    async getCategoryFilters(categoryUrl: string, queries: any): Promise<IPropertyGroup[]> {
        const res = await this.categoryRepo.findOne({
            where: { url: categoryUrl },
            relations: [ 'property_groups', 'property_groups.properties' ]
        });

        return res.property_groups
    }
}
