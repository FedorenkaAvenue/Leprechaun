import { ILabel } from '@interfaces/Label';
import { LabelDTO } from '.';

export class Label extends LabelDTO {
    constructor(type: ILabel['type'], value?: ILabel['value']) {
        super();
        this.type = type;
        this.value = value || null;
    }
}
