import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { CategoryEntity } from '@entities/Category';
import { FSService } from '@services/FS';

@Injectable()
export default class CategoryService {
    constructor(
        @InjectRepository(CategoryEntity) protected readonly categoryRepo: Repository<CategoryEntity>,
        protected readonly FSService: FSService,
    ) { }
}
