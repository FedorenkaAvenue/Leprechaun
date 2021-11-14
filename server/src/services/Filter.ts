import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { FilterGroupEntitry } from '@entities/Filter';

@Injectable()
export class FilterService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
    ) {}

    async getCategoryFilters(categoryUrl: string, queries: any): Promise<FilterGroupEntitry[]> {
        const res = await this.categoryRepo.findOne({
            where: { url: categoryUrl },
            relations: [ 'property_groups', 'property_groups.properties' ]
        });

        //@ts-ignore
        return res.property_groups.map(group => ({
            ...group,
            properties: group.properties.map(prop => ({
                ...prop,
                selected: false,
                amount: 0,
                available: 1
            }))
        }));
    }
}
