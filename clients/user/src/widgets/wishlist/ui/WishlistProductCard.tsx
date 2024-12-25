import { FC } from 'react';

import { WishlistItemModel } from '@entities/wishlist/models/WishlistItem';
import WishlistRemoveProduct from '@features/wishlist/ui/WishlistRemoveProduct';
import OrderAddToCart from '@features/order/ui/OrderAddToCart';
import { ProductCardPreview } from '@entities/product/ui/productCards';

type Props = WishlistItemModel;

const WishlistProductCard: FC<Props> = ({ id, product }) => {
    return (
        <ProductCardPreview
            product={product}
            renderOptions={() => (
                <>
                    <WishlistRemoveProduct itemId={id} />
                    <OrderAddToCart productId={product.id} />
                </>
            )}
        />
    );
};

export default WishlistProductCard;
