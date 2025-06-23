import { Option } from "@shared/models/interfaces";
import { productStatusSchema } from "../model/schemas";

const productStatusOptions: Option[] = [
    { title: 'Available', id: productStatusSchema.enum.AVAILABLE_STATUS },
    { title: 'Out of stock', id: productStatusSchema.enum.OUT_OF_STOCK_STATUS },
];

export default productStatusOptions;
