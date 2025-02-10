import { ProductPreviewPublicI } from "../product/product.interface";
import { HistoryProductI } from "@core/historyProduct/historyProduct.interface";

export type HistoryProductPublicI = HistoryProductI<ProductPreviewPublicI>
