import { PropertyGroupPublic } from '@dto/PropertyGroup/constructor';
import { PropertyEntity } from '@entities/Property';
import { CreatePropertyDTO, PropertyPublicDTO } from '.';

export class Property extends CreatePropertyDTO {
    constructor({ title, alt_name, comment, propertygroup }: CreatePropertyDTO) {
        super();
        this.propertygroup = propertygroup;
        this.title = title;
        this.alt_name = alt_name;
        this.comment = comment || null;
    }
}

export class PropertyPublic extends PropertyPublicDTO {
    constructor({ id, title, alt_name, propertygroup }: PropertyEntity) {
        super();
        this.id = id;
        this.title = title;
        this.alt_name = alt_name;
        this.propertygroup = new PropertyGroupPublic(propertygroup);
    }
}
