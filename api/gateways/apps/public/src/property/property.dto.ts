import { ApiProperty } from "@nestjs/swagger";

import { PropertyPublicI } from "./property.interface";
import { QueriesCommonI } from "@core/queries/queries.interface";
import { PropertyI } from "@core/property/property.interface";

export class PropertyPublic implements PropertyPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;

    constructor({ id, title, alt_name }: PropertyI, lang: QueriesCommonI['lang']) {
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}
