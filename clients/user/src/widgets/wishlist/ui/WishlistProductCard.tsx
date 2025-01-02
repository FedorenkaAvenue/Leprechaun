import { FC } from 'react';

import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import OrderAddToCart from '@features/order/ui/OrderAddToCart';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemOptions from '@features/wishlist/ui/WishlistItemOptions';

type Props = WishlistItemModel;

const WishlistProductCard: FC<Props> = ({ product, id }) => {
    return (
        <ProductCardPreview
            product={product}
            renderTopOptions={() => <WishlistItemOptions itemId={id} />}
            renderBottomOptions={p => <OrderAddToCart productId={p.id} />}
        />
    );
};

export default WishlistProductCard;
