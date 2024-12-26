import { FC } from 'react';

import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import WishlistItemRemove from '@features/wishlist/ui/WishlistItemRemove';
import OrderAddToCart from '@features/order/ui/OrderAddToCart';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';

type Props = WishlistItemModel;

const WishlistProductCard: FC<Props> = ({ id, product }) => {
    return (
        <ProductCardPreview
            product={product}
            renderOptions={() => (
                <>
                    <WishlistItemRemove itemId={id} />
                    <OrderAddToCart productId={product.id} />
                </>
            )}
        />
    );
};

export default WishlistProductCard;
