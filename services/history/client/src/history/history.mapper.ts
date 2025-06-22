import { HistoryPublic } from "gen/history";
import HistoryEntity from "./history.entity";
import { ProductPreviewPublic } from "gen/product";

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
