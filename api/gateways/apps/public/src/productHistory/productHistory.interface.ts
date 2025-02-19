import { ProductPreviewPublicI } from "../product/product.interface";
import { ProductHistoryI } from "@core/productHistory/productHistory.interface";

export type HistoryProductPublicI = ProductHistoryI<ProductPreviewPublicI>
