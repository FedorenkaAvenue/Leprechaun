import { useNavigate } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import routerSubConfig from "@shared/config/router";
import ContentListManager from "@shared/ui/ContentListManager"
import { useProductList } from "@entities/product/api/hooks";
import ProductPreview from "@entities/product/ui/ProductPreview";
import ProductDeleteButton from "@features/product/ui/ProductDeleteButton";
import EditButton from "@shared/ui/EditButton";
import usePagination from "@shared/lib/usePagination";

const ProductTableWidget = () => {
    const [page, setPage] = usePagination();
    const { isFetching, data } = useProductList(page);
    const nav = useNavigate();

    return (
        <ContentListManager
            addItemHandle={() => nav(routerSubConfig.productCreate.path)}
            isLoading={isFetching}
            searchHandle={(val) => alert(val)}
            pagination={{ data, setPage }}
        >
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
                        {data?.data.map(i => (
                            <ProductPreview
                                key={i.id}
                                renderTools={() => (
                                    <>
                                        <ProductDeleteButton productID={i.id} />
                                        <EditButton handleClick={() => alert("Хуя")} title="Edit product" />
                                    </>
                                )}
                                product={i}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </ContentListManager>
    );
};

export default ProductTableWidget;
