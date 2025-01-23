import { QueriesCommon } from '@dto/Queries';
import PropertyGroupService from '.';
import { PropertyGroupPublic } from '@dto/PropertyGroup/private';
import { PropertyGroupPublicI } from '@interfaces/PropertyGroup';

export default class PropertyGroupPublicService extends PropertyGroupService {
    /**
     * @deprecated
     */
    public async getPropertyGroupsByCategory(
        categoryUrl: string, { lang }: QueriesCommon,
    ): Promise<PropertyGroupPublicI[]> {
        const res = await this.propertyGroupRepo.findBy({
            categories: { url: categoryUrl },
        });

        return res.map(propGroup => new PropertyGroupPublic(propGroup, lang));
    }
}
