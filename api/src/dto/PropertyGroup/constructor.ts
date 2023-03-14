import { PropertyPublic } from '@dto/Property/constructor';
import { OptionPublicDTO, PropertyGroupPublicDTO } from '@dto/PropertyGroup';
import { QueriesCommon } from '@dto/Queries/constructor';
import { PropertyGroupEntity } from '@entities/PropertGroup';
import { OptionI } from '@interfaces/PropertyGroup';

export class PropertyGroupPublic extends PropertyGroupPublicDTO {
    constructor({ id, title, alt_name }: PropertyGroupEntity, lang: QueriesCommon['lang']) {
        super();
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}

export class OptionPublic extends OptionPublicDTO {
    constructor({ id, title, alt_name, properties }: OptionI, lang: QueriesCommon['lang']) {
        super();
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
        //@ts-ignore
        this.properties = properties.map(prop => new PropertyPublic(prop, lang));
    }
}
