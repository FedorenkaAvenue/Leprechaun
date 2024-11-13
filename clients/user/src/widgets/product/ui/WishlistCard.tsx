import { FC } from "react";

import ProductCard from "@entities/product/ui/Card";
import { WishListItemModel } from "@entities/wishlist/models/WishList";

type Props = WishListItemModel;

const WishlistProductCard: FC<Props> = (item) => {
    return (
        <ProductCard product={item.product} />
    );
};

export default WishlistProductCard;
