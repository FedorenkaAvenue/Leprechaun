import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { PropertyI } from '@interfaces/Property';
import PropertyService from '.';
import { CreatePropertyDTO } from '@dto/Property/private';

@Injectable()
export default class PropertyPrivateService extends PropertyService {
    public async createProperty(property: CreatePropertyDTO): Promise<PropertyI> {
        try {
            return await this.propertyRepo.save(property);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    public async getProperty(id: PropertyI['id']): Promise<PropertyI | null> {
        return await this.propertyRepo.findOne({ where: { id } });
    }

    public async updateProperty(id: PropertyI['id'], data: CreatePropertyDTO): Promise<UpdateResult> {
        return await this.propertyRepo.update({ id }, { ...data });
    }

    public async deleteProperty(propertyId: PropertyI['id']): Promise<DeleteResult> {
        return await this.propertyRepo.delete({ id: propertyId });
    }
}
