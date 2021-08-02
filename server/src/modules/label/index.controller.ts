import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { LabelService } from "./index.service";

@Controller('label')
@ApiTags('ProductLabel')
export class ProductLabelController {
    constructor(private readonly productService: LabelService) {}
}
