import { BadRequestException } from "@nestjs/common";

import { ILabel } from "./index.interface";

export class CreateLabelDTO implements ILabel {
    type: string;
    value: string;

    constructor({ type, value }: CreateLabelDTO) {
        if (!type) throw new BadRequestException();

        this.type = type;
        this.value = value || null;
    }
}
