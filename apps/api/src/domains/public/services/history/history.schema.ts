import { ApiProperty } from "@nestjs/swagger";

import { ProductPreviewSchema } from "@domains/private/services/product/product.schema";
import { HistoryPublic } from "@gen/history";
import { ProductPreviewPublicSchema } from "../product/product.schema";

export default class HistoryPublicSchema implements HistoryPublic {
    @ApiProperty()
    id: string;

    @ApiProperty({ type: ProductPreviewSchema })
    product: ProductPreviewPublicSchema;
}
