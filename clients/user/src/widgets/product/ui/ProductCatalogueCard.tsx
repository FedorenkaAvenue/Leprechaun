import { FC } from "react";

import { ProductCardModel } from "@entities/product/models/Product";
import { ProductCard } from "@entities/product/ui/productCards";
import OrderAddToCart from "@features/order/ui/OrderAddToCart";
import WishlistAddProduct from "@features/wishlist/ui/WishlistAddProduct";
import AppLink from "@shared/ui/AppLink";

type Props = ProductCardModel;

const ProductCatalogueCard: FC<Props> = (item) => {
    return (
        <div>
            <ProductCard
                product={item}
                renderOptions={product => (
                    <>
                        <WishlistAddProduct productId={product.id} />
                        <OrderAddToCart productId={product.id} />
                    </>
                )}
                renderAdditionalData={product => (
                    !!product.options.length && (
                        <div className="text-sm">
                            {product.options.map(o => (
                                <div key={o.id}>
                                    <span className="text-secondary-foreground">{o.title}</span>:&nbsp;
                                    {o.properties.map(p => (
                                        <span key={p.id}><AppLink href=''>{p.title}</AppLink></span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )
                )}
            />
        </div>
    );
};

export default ProductCatalogueCard;
