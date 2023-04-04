import { ApiProperty } from '@nestjs/swagger';

import { PropertyPublic } from '@dto/Property/constructor';
import { QueriesCommon } from '@dto/Queries/constructor';
import { OptionI, OptionPublicI, PropertyGroupI, PropertyGroupPublicI } from '@interfaces/PropertyGroup';

export class PropertyGroupPublic implements PropertyGroupPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;

    constructor({ id, title, alt_name }: PropertyGroupI, lang: QueriesCommon['lang']) {
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}

export class OptionPublic extends PropertyGroupPublic implements OptionPublicI {
    @ApiProperty({ isArray: true })
    properties: PropertyPublic[];

    constructor({ properties, ...propGroup }: OptionI, lang: QueriesCommon['lang']) {
        super(propGroup, lang);
        this.properties = properties.map(prop => new PropertyPublic(prop, lang));
    }
}
