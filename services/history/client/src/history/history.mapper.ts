import { ProductPreviewPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/product";
import { HistoryPublic } from "@fedorenkaavenue/leprechaun_lib_entities/server/history";

import HistoryEntity from "./history.entity";

export default class HistoryMapper {
    static toViewPublic(
        { createdAt, user, ...history }: HistoryEntity,
        products: ProductPreviewPublic[],
    ): HistoryPublic {
        return {
            ...history,
            product: products.find(({ id }) => id === history.product) as ProductPreviewPublic,
        }
    }
}
