import { ApiProperty } from "@nestjs/swagger";

import { ProductPrice } from "@gen/product";

export class ProductPriceSchema implements ProductPrice {
    @ApiProperty()
    current: number;

    @ApiProperty()
    old: number;
}
