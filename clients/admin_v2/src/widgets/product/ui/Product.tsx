import { useParams } from "react-router-dom";
import { Button } from "@mui/material";

import { useProduct } from "@entities/product/api/hooks";
import Product from "@entities/product/ui/Product";
import ProductDeleteButton from "@features/product/ui/ProductDeleteButton";
import ContentManager from "@shared/ui/ContentManager";

const ProductWidget = () => {
    const { url } = useParams();
    const { data, isFetching } = useProduct(url as string);

    return (
        <ContentManager
            isLoading={isFetching}
            tools={
                <>
                    <Button onClick={() => alert("Хуя")} color='primary' variant='contained'>
                        Edit product
                    </Button>
                    <ProductDeleteButton productID={data?.id} withoutIcon />
                </>
            }
        >
            <Product product={data} />
        </ContentManager>
    );
};

export default ProductWidget;
