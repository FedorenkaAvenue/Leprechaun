import { CreatePropertyGroupDTO } from '@dto/PropertyGroup';

export class PropertyGroup extends CreatePropertyGroupDTO {
    constructor({ title, alt_name, comment }: CreatePropertyGroupDTO) {
        super();
        this.title = title;
        this.alt_name = alt_name;
        this.comment = comment || null;
    }
}
