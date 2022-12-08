import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreatePropertyDTO } from '@dto/Property';
import { PropertyI } from '@interfaces/Property';
import PropertyService from '.';
import { PropertyEntity } from '@entities/Property';

@Injectable()
export default class PropertyPrivateService extends PropertyService {
    async createProperty(property: CreatePropertyDTO): Promise<PropertyEntity> {
        try {
            return await this.propertyRepo.save(property);
        } catch (err) {
            throw new BadRequestException(err.detail);
        }
    }

    async getProperty(id: PropertyI['id']): Promise<PropertyEntity> {
        return await this.propertyRepo.findOne({
            where: { id },
            relations: ['propertygroup'],
        });
    }

    async updateProperty(id: PropertyI['id'], data: CreatePropertyDTO): Promise<UpdateResult> {
        return await this.propertyRepo.update({ id }, { ...data });
    }

    async deleteProperty(propertyId: PropertyI['id']): Promise<DeleteResult> {
        return await this.propertyRepo.delete({ id: propertyId });
    }
}
