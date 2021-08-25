import { ILabel } from "./index.interface";

export class CreateLabelDTO implements ILabel {
    value: string;

    constructor({ value }: CreateLabelDTO) {
        this.value = value || null;
    }
}
