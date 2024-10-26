import OptionModel from "@shared/models/Option";
import ProductStatus from "../model/ProductStatus";

const productStatusOptions: OptionModel[] = [
    { title: 'Available', id: ProductStatus.enum.AVAILABLE },
    { title: 'Out of stock', id: ProductStatus.enum.OUT_OF_STOCK },
];

export default productStatusOptions;
