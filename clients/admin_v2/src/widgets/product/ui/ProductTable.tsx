import { useNavigate } from "react-router-dom";

import routerSubConfig from "@shared/config/router";
import ContentListManager from "@shared/ui/ContentListManager"
import { useProductList } from "@entities/product/api/hooks";
import ProductDeleteButton from "@features/product/ui/ProductDeleteButton";
import EditButton from "@shared/ui/EditButton";
import usePagination from "@shared/lib/usePagination";
import ProductTableFeature from "@features/product/ui/ProductTable";

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
