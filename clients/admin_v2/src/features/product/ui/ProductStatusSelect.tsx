import { forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import Select from "@shared/ui/Select";
import OptionModel from "@shared/models/Option";
import ProductStatus, { ProductStatusT } from "@entities/product/model/ProductStatus";

interface Props extends UseFormRegisterReturn {
    value: ProductStatusT
}

const options: OptionModel[] = [
    { title: 'Available', id: ProductStatus.enum.AVAILABLE },
    { title: 'Out of stock', id: ProductStatus.enum.OUT_OF_STOCK },
];

const ProductStatusSelect = forwardRef<React.JSX.Element, Props>((
    { value, ...props }, ref
) => (
    <Select
        options={options}
        title="Status"
        value={value}
        ref={ref}
        {...props}
    />
));

ProductStatusSelect.displayName = 'ProductStatusSelect';

export default ProductStatusSelect;
