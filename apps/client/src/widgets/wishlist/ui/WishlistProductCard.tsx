import { FC } from 'react';

import CartAddItem from '@features/order/ui/CartAddItem';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemOptions from '@features/wishlist/ui/WishlistItemOptions';
import WishlistItemAdd from './WishlistItemAdd';
import SubscribeProductStatus from '@features/subscription/ui/ProductStatusSubscribe';
import { WishlistItemPublic } from '@gen/wishlist';
import { ProductStatus } from '@gen/product';

interface Props {
    item: WishlistItemPublic;
    shared?: boolean
}

const WishlistProductCard: FC<Props> = ({ item: { product, id }, shared }) => {
    return (
        <ProductCardPreview
            product={product}
            renderTopOptions={shared ? undefined : () => <WishlistItemOptions itemId={id} />}
            renderBottomOptions={p => (
                product.status === ProductStatus.AVAILABLE_STATUS
                    ? (
                        <>
                            {shared && <WishlistItemAdd productId={product.id} />}
                            <CartAddItem productId={p.id} />
                        </>
                    )
                    : <SubscribeProductStatus productId={product.id} />
            )}
        />
    );
};

export default WishlistProductCard;
