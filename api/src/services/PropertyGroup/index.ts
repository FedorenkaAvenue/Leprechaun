import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PropertyGroupEntity } from '@entities/PropertGroup';

@Injectable()
export default class PropertyGroupService {
    constructor(
        @InjectRepository(PropertyGroupEntity) protected readonly propertyGroupRepo: Repository<PropertyGroupEntity>,
    ) {}
}
