import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import {
	CreatePropertyDTO, CreateFilterDTOConstructor, CreatePropertyGroupDTO, CreatePropertyGroupDTOConstructor
} from '@dto/Property';
import { PropertyGroupEntity, PropertyEntity, ProductGroupBaseEntity } from '@entities/Property';

@Injectable()
export class PropertyGroupService {
    constructor(
		@InjectRepository(PropertyGroupEntity) private readonly propertyGroupRepo: Repository<PropertyGroupEntity>
	) {}

	createGroup(newGroup: CreatePropertyGroupDTO): Promise<ProductGroupBaseEntity> {
		return this.propertyGroupRepo.save(new CreatePropertyGroupDTOConstructor(newGroup));
	}

	getGroup(groupId: number): Promise<PropertyGroupEntity> {
		return this.propertyGroupRepo.findOne({
			where: { id: groupId },
			relations: [ 'properties' ]
		});
	}

	getAllGroups(): Promise<PropertyGroupEntity[]> {
		return this.propertyGroupRepo.find({
			relations: [ 'properties' ]
		});
	}

	deleteGroup(groupId: number): Promise<DeleteResult> {
		return this.propertyGroupRepo.delete({ id: groupId });
	}
}

@Injectable()
export class PropertyService {
    constructor(
		@InjectRepository(PropertyEntity) private readonly propertyRepo: Repository<PropertyEntity>
	) {}

	createFilter(filter: CreatePropertyDTO): Promise<PropertyEntity> {
		return this.propertyRepo.save(new CreateFilterDTOConstructor(filter));
	}

	getFilter(filterId: number): Promise<PropertyEntity> {
		return this.propertyRepo.findOne({ id: filterId });
	}

	deletefilter(filterId): Promise<DeleteResult> {
		return this.propertyRepo.delete({ id: filterId });
	}
}
