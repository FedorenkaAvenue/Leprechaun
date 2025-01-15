import { FC } from 'react';

import { ProductPreviewModel } from '@entities/product/model/interfaces';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';
import CartAddItem from '@features/order/ui/CartAddItem';

interface Props {
    product: ProductPreviewModel
}

const HistoryProductCard: FC<Props> = ({ product }) => {
    return (
        <ProductCardPreview
            product={product}
            renderBottomOptions={p => (
                <>
                    <WishlistItemAdd productId={product.id} />
                    <CartAddItem productId={p.id} />
                </>
            )}
        />
    );
};

export default HistoryProductCard;
