import { ApiProperty } from '@nestjs/swagger';

import { SearchItemE } from '@enums/Search';
import { SearchItemI } from '@interfaces/Search';

export class SearchItemDTO implements SearchItemI {
    @ApiProperty({ enum: SearchItemE })
    type: SearchItemE;

    @ApiProperty()
    item: any;
}
