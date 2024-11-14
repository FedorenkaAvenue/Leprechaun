import { FC } from "react";

import { WishListItemModel } from "@entities/wishlist/models/WishList";
import ProductPreview from "@entities/product/ui/Preview";

type Props = WishListItemModel;

const WishlistProductCard: FC<Props> = (item) => {
    return (
        <ProductPreview product={item.product} />
    );
};

export default WishlistProductCard;
