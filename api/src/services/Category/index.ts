import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '@entities/Category';
import { FSService } from '@services/FS';
import { SEService } from '@services/SE';

@Injectable()
export default class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) protected readonly categoryRepo: Repository<CategoryEntity>,
        protected readonly FSService: FSService,
        protected readonly SEService: SEService,
    ) {}

    /**
     * @description get category list by criteria
     * @param {FindManyOptions<CategoryEntity>} options search criteria option
     * @returns array of CategoryEntity
     */
    public async getCategoryListByCriteria(options: FindManyOptions<CategoryEntity>): Promise<CategoryEntity[]> {
        return await this.categoryRepo.find(options);
    }
}
