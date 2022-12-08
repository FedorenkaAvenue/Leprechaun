import { PropertyGroupPublic } from '@dto/PropertyGroup/constructor';
import { PropertyEntity } from '@entities/Property';
import { QueriesProductT } from '@interfaces/Queries';
import { PropertyPublicDTO } from '.';

export class PropertyPublic extends PropertyPublicDTO {
    constructor({ id, title, alt_name, propertygroup }: PropertyEntity, searchParams: QueriesProductT) {
        super();
        this.id = id;
        this.title = title[searchParams.lang];
        this.alt_name = alt_name;
        this.propertygroup = new PropertyGroupPublic(propertygroup, searchParams);
    }
}
