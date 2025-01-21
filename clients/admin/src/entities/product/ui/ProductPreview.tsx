import { TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactNode } from "react";

import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";
import ProductTogglePublic from "@features/product/ui/ProductTogglePublic";
import ProductStatusSelect from "@features/product/ui/ProductStatusSelect";
import ProductPreviewModel from "../model/ProductPreview";
import Image from '@shared/ui/Image';

interface Props {
    product: ProductPreviewModel
    renderTools?: (product: ProductPreviewModel) => ReactNode
}

const ProductPreview = ({ product, renderTools }: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">
                <Link to={String(product.id)}>
                    <Typography color='primary' component='span'>{product.id}</Typography>
                </Link>
            </TableCell>
            <TableCell align="left">
                {renderTools?.call(null, product)}
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<TransList data={product.title} />} />
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<Image src={product.image} />} />
            </TableCell>
            <TableCell align="right">
                <ProductTogglePublic selected={product.is_public} />
            </TableCell>
            <TableCell align="right">
                <ProductStatusSelect productId={product.id} value={product.status} size='small' />
            </TableCell>
        </TableRow >
    );
};

export default ProductPreview;
