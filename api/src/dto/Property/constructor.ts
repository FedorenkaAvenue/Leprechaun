import { QueriesCommon } from '@dto/Queries/constructor';
import { PropertyEntity } from '@entities/Property';
import { PropertyPublicDTO } from '.';

export class PropertyPublic extends PropertyPublicDTO {
    constructor({ id, title, alt_name }: PropertyEntity, lang: QueriesCommon['lang']) {
        super();
        this.id = id;
        this.title = title[lang];
        this.alt_name = alt_name;
    }
}
