import { Injectable } from '@nestjs/common';

import PropertyGroupPublicService from '@services/PropertyGroup/public';

@Injectable()
export default class FilterService {
    constructor(protected readonly propertyGroupService: PropertyGroupPublicService) {}
}
