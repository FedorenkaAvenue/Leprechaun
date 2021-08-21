import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { FilterService } from "./index.service";

@Controller('filter')
@ApiTags('Filter')
export class FilterController {
    constructor(private readonly filterService: FilterService) {}
}
