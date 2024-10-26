import { TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

import TooltipContent from "@shared/ui/TooltipContent";
import { ProductModel } from "../model/Product";
import TransList from "@shared/ui/TransList";
import ProductTogglePublic from "@features/product/ui/ProductTogglePublic";
import ProductStatusSelect from "@features/product/ui/ProductStatusSelect";

interface Props {
    product: ProductModel
    renderTools: () => ReactNode
}

const ProductPreview = ({
    product: { id, title, is_public, status },
    renderTools,
}: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">
                <Link to={String(id)}>
                    <Typography color='primary' component='span'>{id}</Typography>
                </Link>
            </TableCell>
            <TableCell align="left">
                {renderTools?.call(null)}
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<TransList data={title} />} />
            </TableCell>
            <TableCell align="right">
                <ProductTogglePublic selected={is_public} />
            </TableCell>
            <TableCell align="right">
                <ProductStatusSelect value={status} size='small' />
            </TableCell>
        </TableRow >
    );
};

export default ProductPreview;
