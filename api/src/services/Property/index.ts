import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PropertyEntity } from '@entities/Property';

@Injectable()
export default class PropertyService {
    constructor(@InjectRepository(PropertyEntity) protected readonly propertyRepo: Repository<PropertyEntity>) {}
}
