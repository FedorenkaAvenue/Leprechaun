import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";

import { CreateFilterDTO, CreateFilterGroupDTO } from "./index.dto";
import { FilterGroupEntity, FilterEntity, FilterGroupBaseEntity } from "./index.entity";

@Injectable()
export class FilterGroupService {
    constructor(
		@InjectRepository(FilterGroupEntity) private readonly filterGroupRepo: Repository<FilterGroupEntity>
	) {}

	createGroup(group: CreateFilterGroupDTO): Promise<FilterGroupBaseEntity> {
		return this.filterGroupRepo.save(group);
	}

	getGroup(groupId: number): Promise<FilterGroupEntity> {
		return this.filterGroupRepo.findOne({ id: groupId });
	}

	getAllGroups(): Promise<FilterGroupEntity[]> {
		return this.filterGroupRepo.find();
	}

	deleteGroup(groupId: number): Promise<DeleteResult> {
		return this.filterGroupRepo.delete({ id: groupId });
	}
}

@Injectable()
export class FilterService {
    constructor(
		@InjectRepository(FilterEntity) private readonly filterRepo: Repository<FilterEntity>
	) {}

	createFilter(filter: CreateFilterDTO): Promise<FilterEntity> {
		return this.filterRepo.save(filter);
	}

	getFilter(filterId: number): Promise<FilterEntity> {
		return this.filterRepo.findOne({ id: filterId });
	}

	deletefilter(filterId): Promise<DeleteResult> {
		return this.filterRepo.delete({ id: filterId });
	}
}