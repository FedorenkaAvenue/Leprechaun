import { ApiProperty } from "@nestjs/swagger";

import { PropertyGroupPublicI } from "./propertyGroup.interface";
import { QueriesCommonI } from "@core/queries/queries.interface";
import { PropertyGroupI } from "@core/propertyGroup/propertyGroup.interface";

export class PropertyGroupPublic implements PropertyGroupPublicI {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    alt_name: string;

    constructor({ id, title, alt_name }: PropertyGroupI, lang: QueriesCommonI['lang']) {
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}
