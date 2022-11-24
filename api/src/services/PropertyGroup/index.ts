import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PropertyGroupI } from '@interfaces/PropertyGroup';
import { PropertyGroupEntity } from '@entities/PropertGroup';

@Injectable()
export default class PropertyGroupService {
    constructor(
        @InjectRepository(PropertyGroupEntity) protected readonly propertyGroupRepo: Repository<PropertyGroupEntity>,
    ) {}

    /**
     * @description get property group by ID
     * @param id property group ID
     * @returns property group
     */
    async getGroupByID(id: PropertyGroupI['id']): Promise<PropertyGroupI> {
        return await this.propertyGroupRepo.findOne({
            where: { id },
            relations: ['properties'],
        });
    }

    /**
     * @description get all property groups
     * @returns property group list
     */
    async getGroups(): Promise<PropertyGroupI[]> {
        return await this.propertyGroupRepo.find();
    }
}
