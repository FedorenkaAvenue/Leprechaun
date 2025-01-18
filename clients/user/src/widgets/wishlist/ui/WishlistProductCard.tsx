import { FC } from 'react';

import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import CartAddItem from '@features/order/ui/CartAddItem';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemOptions from '@features/wishlist/ui/WishlistItemOptions';
import WishlistItemAdd from './WishlistItemAdd';
import { ProductStatusModel } from '@entities/product/model/enums';
import ProductStatusNotify from '@features/product/ui/ProductStatusNotify';

interface Props {
    item: WishlistItemModel;
    shared?: boolean
}

const WishlistProductCard: FC<Props> = ({ item: { product, id }, shared }) => {
    return (
        <ProductCardPreview
            product={product}
            renderTopOptions={shared ? undefined : () => <WishlistItemOptions itemId={id} />}
            renderBottomOptions={p => (
                product.status === ProductStatusModel.AVAILABLE
                    ? (
                        <>
                            {shared && <WishlistItemAdd productId={product.id} />}
                            <CartAddItem productId={p.id} />
                        </>
                    )
                    : <ProductStatusNotify productId={product.id} />
            )}
        />
    );
};

export default WishlistProductCard;
