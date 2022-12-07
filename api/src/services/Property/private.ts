import { Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreatePropertyDTO } from '@dto/Property';
import { PropertyI } from '@interfaces/Property';
import { Property } from '@dto/Property/constructor';
import PropertyService from '.';
import { PropertyEntity } from '@entities/Property';

@Injectable()
export default class PropertyPrivateService extends PropertyService {
    async createProperty(property: CreatePropertyDTO): Promise<void> {
        await this.propertyRepo.save(new Property(property));
    }

    async getProperty(id: PropertyI['id']): Promise<PropertyEntity> {
        return await this.propertyRepo.findOne({
            where: { id },
            relations: ['property_group'],
        });
    }

    async updateProperty(id: PropertyI['id'], data: CreatePropertyDTO): Promise<UpdateResult> {
        return await this.propertyRepo.update({ id }, { ...data });
    }

    async deleteProperty(propertyId: PropertyI['id']): Promise<DeleteResult> {
        return await this.propertyRepo.delete({ id: propertyId });
    }
}
