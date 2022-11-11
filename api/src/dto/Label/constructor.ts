import { LabelI } from '@interfaces/Label';
import { LabelDTO } from '.';

export class Label extends LabelDTO {
    constructor(type: LabelI['type'], value?: LabelI['value']) {
        super();
        this.type = type;
        this.value = value || null;
    }
}
