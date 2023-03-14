import { QueriesCommon } from '@dto/Queries/constructor';
import PropertyGroupService from '.';
import { PropertyGroupPublic } from '@dto/PropertyGroup/constructor';

export default class PropertyGroupPublicService extends PropertyGroupService {
    /**
     * @deprecated
     */
    async getPropertyGroupsByCategory(categoryUrl: string, { lang }: QueriesCommon): Promise<PropertyGroupPublic[]> {
        const res = await this.propertyGroupRepo.findBy({
            categories: { url: categoryUrl },
        });

        return res.map(propGroup => new PropertyGroupPublic(propGroup, lang));
    }
}
