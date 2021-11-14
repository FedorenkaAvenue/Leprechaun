import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreatePropertyGroupDTO, CreatePropertyGroupDTOConstructor } from '@dto/Property';
import { IPropertyGroup } from '@interfaces/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';

@Injectable()
export class PropertyGroupService {
    constructor(
		@InjectRepository(PropertyGroupEntity) private readonly propertyGroupRepo: Repository<PropertyGroupEntity>
	) {}

	async createGroup(newGroup: CreatePropertyGroupDTO): Promise<void> {
		await this.propertyGroupRepo.save(new CreatePropertyGroupDTOConstructor(newGroup));
	}

	getGroup(groupId: number): Promise<IPropertyGroup> {
		return this.propertyGroupRepo.findOne({
			where: { id: groupId },
			relations: [ 'properties' ]
		});
	}

	getAllGroups(): Promise<IPropertyGroup[]> {
		return this.propertyGroupRepo.find();
	}

	deleteGroup(groupId: number): Promise<DeleteResult> {
		return this.propertyGroupRepo.delete({ id: groupId });
	}
}
