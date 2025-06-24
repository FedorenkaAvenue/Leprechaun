import { FC } from 'react';

import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';
import CartAddItem from '@features/order/ui/CartAddItem';
import SubscribeProductStatus from '@features/subscription/ui/ProductStatusSubscribe';
import { ProductPreviewPublic, ProductStatus } from '@gen/product';

interface Props {
    product: ProductPreviewPublic
}

const HistoryProductCard: FC<Props> = ({ product }) => {
    return (
        <ProductCardPreview
            product={product}
            renderBottomOptions={p => (
                <>
                    <WishlistItemAdd productId={p.id} />
                    {
                        p.status === ProductStatus.AVAILABLE_STATUS
                            ? <CartAddItem productId={p.id} />
                            : <SubscribeProductStatus productId={p.id} />
                    }
                </>
            )}
        />
    );
};

export default HistoryProductCard;
