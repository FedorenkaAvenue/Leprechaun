import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PropertyEntity } from '@entities/Property';
import { PropertyI } from '@interfaces/Property';

@Injectable()
export default class PropertyService {
    constructor(@InjectRepository(PropertyEntity) protected readonly propertyRepo: Repository<PropertyEntity>) {}

    /**
     * @description get propert by ID
     * @param id property ID
     * @returns property
     */
    async getPropertyByID(id: PropertyI['id']): Promise<PropertyI> {
        return await this.propertyRepo.findOne({
            where: { id },
            relations: ['property_group'],
        });
    }
}
