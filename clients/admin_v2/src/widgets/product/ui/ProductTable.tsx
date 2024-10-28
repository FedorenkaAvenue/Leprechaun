import { useNavigate } from "react-router-dom";

import routerSubConfig from "@shared/config/router";
import ContentListManager from "@shared/ui/ContentListManager"
import { useProductList } from "@entities/product/api/hooks";
import ProductDeleteButton from "@features/product/ui/ProductDeleteButton";
import EditButton from "@shared/ui/EditButton";
import ProductTableFeature from "@features/product/ui/ProductTable";
import CategorySelectList from "@features/category/ui/CategorySelectList";
import useQueryParam from "@shared/lib/useQueryParam";
import URL_QUERY_PARAMS from "@shared/constants/urlQueryParams";

const ProductTableWidget = () => {
    const [params, setParams] = useQueryParam<keyof typeof URL_QUERY_PARAMS>(['page', 'category']);
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
                    value={params.category ? Number(params.category) : ''}
                />}
        >
            <ProductTableFeature
                products={data?.data}
                renderProductTools={product => (
                    <>
                        <ProductDeleteButton productID={product.id} />
                        <EditButton handleClick={() => alert("Хуя")} title="Edit product" />
                    </>
                )}
            />
        </ContentListManager>
    );
};

export default ProductTableWidget;
