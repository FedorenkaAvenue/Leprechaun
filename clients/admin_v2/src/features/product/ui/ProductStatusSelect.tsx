import { forwardRef } from "react";
import { SelectChangeEvent } from "@mui/material";

import Select, { CustomSelectProps } from "@shared/ui/Select";
import { ProductStatusT } from "@entities/product/model/ProductStatus";
import productStatusOptions from "@entities/product/constants/productStatusOptions";

type Props = {
    value: ProductStatusT
} & Omit<CustomSelectProps, 'options' | 'multiple'>;

const ProductStatusSelect = forwardRef<React.JSX.Element, Props>((
    { value, ...props }, ref
) => {
    function select(event: SelectChangeEvent<any>): void {
        alert('Хуя')
    }

    return (
        <Select
            options={productStatusOptions}
            title="Status"
            onChange={select}
            value={value}
            ref={ref}
            {...props}
        />
    )
});

ProductStatusSelect.displayName = 'ProductStatusSelect';

export default ProductStatusSelect;
