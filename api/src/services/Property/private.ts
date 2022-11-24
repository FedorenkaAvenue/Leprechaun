import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';

import { CreatePropertyDTO } from '@dto/Property';
import { PropertyI } from '@interfaces/Property';
import { Property } from '@dto/Property/constructor';
import PropertyService from '.';

@Injectable()
export default class PropertyPrivateService extends PropertyService {
    async createProperty(property: CreatePropertyDTO): Promise<void> {
        await this.propertyRepo.save(new Property(property));
    }

    async getProperty(id: PropertyI['id']): Promise<PropertyI> {
        return await this.getPropertyByID(id);
    }

    async deleteProperty(propertyId: PropertyI['id']): Promise<DeleteResult> {
        return await this.propertyRepo.delete({ id: propertyId });
    }
}
