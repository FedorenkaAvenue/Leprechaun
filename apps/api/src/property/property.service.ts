import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePropertyDTO } from './property.dto';
import { PropertyI } from '@core/property/property.interface';
import { PropertyEntity } from '@core/property/property.entity';

@Injectable()
export default class PropertyService {
    constructor(
        @InjectRepository(PropertyEntity) private readonly propertyRepo: Repository<PropertyEntity>
    ) { }

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
