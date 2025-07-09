import { ApiProperty } from "@nestjs/swagger";
import { ProductPrice } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";

export class ProductPriceSchema implements ProductPrice {
    @ApiProperty()
    current: number;

    @ApiProperty()
    old: number;
}

export class ProductImageSchema {
    @ApiProperty()
    id: string;

    @ApiProperty()
    src: string;
}
