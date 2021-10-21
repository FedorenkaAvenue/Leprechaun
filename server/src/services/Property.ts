import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import {
	CreatePropertyDTO, CreateFilterDTOConstructor, CreatePropertyGroupDTO, CreatePropertyGroupDTOConstructor
} from '@dto/Property';
import { PropertyGroupEntity, PropertyEntity, ProductGroupBaseEntity } from '@entities/Property';

/**
 * @description /propertygroup controller service
 */
@Injectable()
export class PropertyGroupService {
    constructor(
		@InjectRepository(PropertyGroupEntity) private readonly propertyGroupRepo: Repository<PropertyGroupEntity>
	) {}

	async createGroup(newGroup: CreatePropertyGroupDTO): Promise<void> {
		await this.propertyGroupRepo.save(new CreatePropertyGroupDTOConstructor(newGroup));
	}

	getGroup(groupId: number): Promise<PropertyGroupEntity> {
		return this.propertyGroupRepo.findOne({
			where: { id: groupId },
			relations: [ 'properties' ]
		});
	}

	getAllGroups(): Promise<PropertyGroupEntity[]> {
		return this.propertyGroupRepo.find();
	}

	deleteGroup(groupId: number): Promise<DeleteResult> {
		return this.propertyGroupRepo.delete({ id: groupId });
	}
}

/**
 * @description /property controller service
 */
@Injectable()
export class PropertyService {
    constructor(
		@InjectRepository(PropertyEntity) private readonly propertyRepo: Repository<PropertyEntity>
	) {}

	async createProperty(property: CreatePropertyDTO): Promise<void> {
		await this.propertyRepo.save(new CreateFilterDTOConstructor(property));
	}

	getProperty(propertyId: number): Promise<PropertyEntity> {
		return this.propertyRepo.findOne({
			where: { id: propertyId },
			relations: [ 'property_group' ]
		});
	}

	deleteProperty(propertyId): Promise<DeleteResult> {
		return this.propertyRepo.delete({ id: propertyId });
	}
}
