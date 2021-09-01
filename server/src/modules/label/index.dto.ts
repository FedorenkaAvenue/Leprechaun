import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { ILabel } from "./index.interface";

export class CreateLabelDTO implements ILabel {
    @IsNotEmpty()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    value: string;
}

export class CreateLabelDTOConstructor extends CreateLabelDTO {
    constructor({ type, value }: CreateLabelDTO) {
        super();
        this.type = type;
        this.value = value || null;
    }
}
