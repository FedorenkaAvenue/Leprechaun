import { FC } from 'react';

import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import OrderAddToCart from '@features/order/ui/OrderAddToCart';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemOptions from '@features/wishlist/ui/WishlistItemOptions';

interface Props {
    item: WishlistItemModel;
    shared?: boolean
}

const WishlistProductCard: FC<Props> = ({ item: { product, id }, shared }) => {
    return (
        <ProductCardPreview
            product={product}
            renderTopOptions={shared ? undefined : () => <WishlistItemOptions itemId={id} />}
            renderBottomOptions={p => <OrderAddToCart productId={p.id} />}
        />
    );
};

export default WishlistProductCard;
