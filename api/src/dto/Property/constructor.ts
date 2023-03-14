import { ApiProperty } from '@nestjs/swagger';

import { QueriesCommon } from '@dto/Queries/constructor';
import { PropertyI, PropertyPublicI } from '@interfaces/Property';

export class PropertyPublic implements PropertyPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;

    constructor({ id, title, alt_name }: PropertyI, lang: QueriesCommon['lang']) {
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}
