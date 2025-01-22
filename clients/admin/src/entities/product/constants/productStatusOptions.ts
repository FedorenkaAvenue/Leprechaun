import { Option } from "@shared/models/interfaces";
import { productStatusSchema } from "../model/schemas";

const productStatusOptions: Option[] = [
    { title: 'Available', id: String(productStatusSchema.enum.AVAILABLE) },
    { title: 'Out of stock', id: String(productStatusSchema.enum.OUT_OF_STOCK) },
];

export default productStatusOptions;
