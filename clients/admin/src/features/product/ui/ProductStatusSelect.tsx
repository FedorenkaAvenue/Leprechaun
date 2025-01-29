import { forwardRef } from "react";
import { SelectChangeEvent } from "@mui/material";

import Select, { CustomSelectProps } from "@shared/ui/Select";
import productStatusOptions from "@entities/product/constants/productStatusOptions";
import { Product } from "@entities/product/model/interfaces";
import { ProductStatus } from "@entities/product/model/enums";
import { useUpdateProduct } from "../model/hook";
import withRoleBlur from "@shared/hocs/withRoleBlur";
import { UserRole } from "@entities/user/model/enums";

type Props = {
    productId: Product['id']
    value: ProductStatus
} & Omit<CustomSelectProps, 'options' | 'multiple'>;

const ProductStatusSelect = forwardRef<React.JSX.Element, Props>((
    { value, productId, ...props }, ref
) => {
    const [mutate] = useUpdateProduct();

    function select({ target: { value } }: SelectChangeEvent<any>): void {
        mutate({ id: productId, updates: { status: value } });
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

export default withRoleBlur(ProductStatusSelect, UserRole.ADMIN);
