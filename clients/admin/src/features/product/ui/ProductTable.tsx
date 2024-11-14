import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ReactNode } from "react";

import ProductPreview from "@entities/product/ui/ProductPreview";
import ProductPreviewModel from "@entities/product/model/ProductPreview";
import Empty from "@shared/ui/Empty";

interface Props {
    products: ProductPreviewModel[] | undefined
    renderProductTools?: (product: ProductPreviewModel) => ReactNode
}

const ProductTableFeature = ({ products, renderProductTools }: Props) => {
    return (
        <Empty data={products?.length} align="center">
            <TableContainer component={Paper}>
                <Table aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align="left">Tools</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align='right'>Titles</TableCell>
                            <TableCell sx={{ fontWeight: 700 }} align='right'>Image</TableCell>
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
        </Empty>
    )
};

export default ProductTableFeature;
