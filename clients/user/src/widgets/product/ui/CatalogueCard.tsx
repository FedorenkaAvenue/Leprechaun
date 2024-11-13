import { FC } from "react";

import { ProductCardModel } from "@entities/product/models/Product";
import ProductCard from "@entities/product/ui/Card";
import AddProductToCart from "@features/order/ui/AddToCart";
import ProductAddToFavorite from "@features/wishlist/ui/AddToFavorite";

type Props = ProductCardModel;

const ProductCatalogueCard: FC<Props> = (item) => {
    return (
        <div>
            <ProductCard
                product={item}
                renderTools={product => (
                    <div className='flex gap-2'>
                        <ProductAddToFavorite productId={product.id} />
                        <AddProductToCart productId={product.id} />
                    </div>
                )}
            />
        </div>
    );
};

export default ProductCatalogueCard;
