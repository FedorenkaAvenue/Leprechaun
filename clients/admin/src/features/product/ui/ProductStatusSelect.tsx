import { forwardRef } from "react";
import { SelectChangeEvent } from "@mui/material";

import Select, { CustomSelectProps } from "@shared/ui/Select";
import { ProductStatusT } from "@entities/product/model/ProductStatus";
import productStatusOptions from "@entities/product/constants/productStatusOptions";
import { useUpdateProduct } from "../api/hook";
import { ProductModel } from "@entities/product/model/Product";

type Props = {
    productId: ProductModel['id']
    value: ProductStatusT
} & Omit<CustomSelectProps, 'options' | 'multiple'>;

const ProductStatusSelect = forwardRef<React.JSX.Element, Props>((
    { value, productId, ...props }, ref
) => {
    const { mutate } = useUpdateProduct(productId);

    function select({ target: { value } }: SelectChangeEvent<any>): void {
        mutate({ status: value });
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
