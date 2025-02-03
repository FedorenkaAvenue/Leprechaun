import { TableCell, TableRow, Typography } from "@mui/material";
import { Link } from "react-router";
import { ReactNode } from "react";

import TooltipContent from "@shared/ui/TooltipContent";
import TransList from "@shared/ui/TransList";
import ProductTogglePublic from "@features/product/ui/ProductTogglePublic";
import ProductStatusSelect from "@features/product/ui/ProductStatusSelect";
import Image from '@shared/ui/Image';
import { ProductPreview } from "../model/interfaces";

interface Props {
    product: ProductPreview
    renderTools?: (product: ProductPreview) => ReactNode
}

const ProductPreviewEntity = ({ product, renderTools }: Props) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">
                <Link to={String(product.id)}>
                    <Typography
                        color='primary'
                        component='span'
                        className='text-ellipsis whitespace-nowrap overflow-hidden inline-block sm:max-w-48 2xl:max-w-none'
                    >
                        {product.id}
                    </Typography>
                </Link>
            </TableCell>
            <TableCell align="left">
                {renderTools?.call(null, product)}
            </TableCell>
            <TableCell align="right">
                <TooltipContent content={<TransList data={product.title} />} />
            </TableCell>
            <TableCell align="right">
                {
                    product.image
                        ? <TooltipContent content={<Image src={product.image} />} />
                        : <Typography color='textDisabled'>empty</Typography>
                }
            </TableCell>
            <TableCell align="right">
                <ProductTogglePublic productId={product.id} selected={product.is_public} />
            </TableCell>
            <TableCell align="right">
                <ProductStatusSelect productId={product.id} value={product.status} size='small' />
            </TableCell>
        </TableRow >
    );
};

export default ProductPreviewEntity;
