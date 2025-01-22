import { useNavigate } from "react-router-dom";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

import routerSubConfig from "@shared/config/router";
import ContentListManager from "@shared/ui/ContentListManager"
import ProductDeleteButton from "@features/product/ui/ProductDeleteButton";
import EditButton from "@shared/ui/EditButton";
import CategorySelectList from "@features/category/ui/CategorySelectList";
import useQueryParam from "@shared/lib/useQueryParam";
import { PRODUCT_LIST_URL_QUERY_PARAMS } from "@features/product/constants/urlQueryParams";
import Empty from "@shared/ui/Empty";
import ProductPreview from "@entities/product/ui/ProductPreview";
import { useProductList } from "@entities/product/model/hooks";

const ProductTablePage = () => {
    const [params, setParams] = useQueryParam<keyof typeof PRODUCT_LIST_URL_QUERY_PARAMS>(['page', 'category']);
    const { isFetching, data } = useProductList({ page: params.page, category: params.category });
    const nav = useNavigate();

    return (
        <ContentListManager
            addItemHandle={() => nav(routerSubConfig.productCreate.path)}
            isLoading={isFetching}
            searchHandle={(val) => alert(val)}
            pagination={{
                data,
                setPage: (n: number) => setParams({ ...params, page: String(n) }),
            }}
            additionalTools={
                <CategorySelectList
                    onChange={({ target: { value } }) => {
                        setParams({ ...params, category: value })
                    }}
                    size='small'
                    value={params.category ? params.category : ''}
                />}
        >
            <Empty data={data?.data.length} align="center">
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
                            {data?.data.map(i => (
                                <ProductPreview
                                    key={i.id}
                                    renderTools={product => (
                                        <>
                                            <ProductDeleteButton productID={product.id} />
                                            <EditButton handleClick={() => alert("Хуя")} title="Edit product" />
                                        </>
                                    )}
                                    product={i}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Empty>
        </ContentListManager>
    );
};

export default ProductTablePage;
