import { FC } from 'react';

import { WishListItemModel } from '@entities/wishlist/models/WishList';
import ProductRemoveFromFavorite from '@features/wishlist/ui/RemoveFromFavorite';
import ProductPreviewModel from '@entities/product/ui/CardPreview';
import AddProductToCart from '@features/order/ui/AddToCart';

type Props = WishListItemModel;

const WishlistCard: FC<Props> = ({ id, product }) => {
    return (
        <ProductPreviewModel
            product={product}
            renderTools={() => (
                <>
                    <ProductRemoveFromFavorite itemId={id} />
                    <AddProductToCart productId={product.id} />
                </>
            )}
        />
    );
};

export default WishlistCard;
