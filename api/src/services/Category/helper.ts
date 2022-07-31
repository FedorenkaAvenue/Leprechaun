import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from '@entities/Category';
import { FSService } from '@services/FS';

export default class CategoryHelperService {
    constructor(
		@InjectRepository(CategoryEntity) protected readonly categoryRepo: Repository<CategoryEntity>,
		protected readonly FSService: FSService
	) {}
}
