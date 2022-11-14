import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';

import { CreatePropertyDTO } from '@dto/Property';
import { PropertyEntity } from '@entities/Property';
import { PropertyI } from '@interfaces/Property';
import { Property } from '@dto/Property/constructor';

@Injectable()
export class PropertyService {
    constructor(@InjectRepository(PropertyEntity) private readonly propertyRepo: Repository<PropertyEntity>) {}

    async createProperty(property: CreatePropertyDTO): Promise<void> {
        await this.propertyRepo.save(new Property(property));
    }

    getProperty(propertyId: PropertyI['id']): Promise<PropertyI> {
        return this.propertyRepo.findOne({
            where: { id: propertyId },
            relations: ['property_group'],
        });
    }

    deleteProperty(propertyId: PropertyI['id']): Promise<DeleteResult> {
        return this.propertyRepo.delete({ id: propertyId });
    }
}
