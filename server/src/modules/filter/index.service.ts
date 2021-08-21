import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { FilterGroupEntity, FilterEntity } from "./index.entity";

@Injectable()
export class FilterService {
    constructor(
		@InjectRepository(FilterGroupEntity) private readonly filterGroupRepo: Repository<FilterGroupEntity>,
		@InjectRepository(FilterGroupEntity) private readonly filterRepo: Repository<FilterEntity>
	) {}
}
