import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";

import ProductPreview from "@entities/product/ui/ProductPreview";
import ProductPreviewModel from "@entities/product/model/ProductPreview";

interface Props {
    products: ProductPreviewModel[] | undefined
    renderProductTools?: (product: ProductPreviewModel) => ReactNode
}

const ProductTableFeature = ({ products, renderProductTools }: Props) => {
    return products?.length
        ? (
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Tools</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align='right'>Titles</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Is public</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products?.map(i => (
                            <ProductPreview key={i.id} renderTools={renderProductTools} product={i} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
        : <Typography align="center">There are no products</Typography>
};

export default ProductTableFeature;
