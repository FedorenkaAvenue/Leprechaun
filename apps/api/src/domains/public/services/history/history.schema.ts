import { ApiProperty } from "@nestjs/swagger";
import { HistoryPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/history";

import { ProductPreviewPublicSchema } from "../product/product.schema";

export default class HistoryPublicSchema implements HistoryPublic {
    @ApiProperty()
    id: string;

    @ApiProperty({ type: ProductPreviewPublicSchema })
    product: ProductPreviewPublicSchema;
}
