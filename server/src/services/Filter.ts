import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { FiltersDTO } from '@dto/Filter';
import { ISearchReqQueries } from '@interfaces/Queries';

@Injectable()
export class FilterService {
    constructor(
        @InjectRepository(CategoryEntity) private readonly categoryRepo: Repository<CategoryEntity>,
    ) {}

    async getCategoryFilters(categoryUrl: string, queries: ISearchReqQueries): Promise<FiltersDTO> {
        const res = await this.categoryRepo.findOne({
            where: { url: categoryUrl },
            relations: [ 'property_groups', 'property_groups.properties' ]
        });

        if (!res) throw new NotFoundException('category not found');

        return new FiltersDTO(res.property_groups, queries);
    }
}
