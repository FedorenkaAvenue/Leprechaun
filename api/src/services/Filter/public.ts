import { Injectable } from '@nestjs/common';

import { QueriesCommon } from '@dto/Queries/constructor';
import FilterService from '.';
import { FilterPublic } from '@dto/Filter/constructor';
import FilterE from '@enums/Filter';

@Injectable()
export default class FilterPublicService extends FilterService {
    public async getCategoryFilters(categoryUrl: string, searchParams: QueriesCommon) {
        const res = await this.propertyGroupService.getPropertyGroupsByCategory(categoryUrl, searchParams);

        return res.map(propGroup => new FilterPublic({ type: FilterE.LIST, data: propGroup }));
    }
}
