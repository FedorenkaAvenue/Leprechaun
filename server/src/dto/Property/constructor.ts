import { CreatePropertyDTO } from '.';

export class Property extends CreatePropertyDTO {
    constructor({ title, alt_name, comment, property_group }: CreatePropertyDTO) {
        super();
        this.property_group = property_group;
        this.title = title;
        this.alt_name = alt_name;
        this.comment = comment || null;
    }
}
