import { FC } from 'react';

import { ProductPreviewModel } from '@entities/product/model/interfaces';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';
import { ProductStatusModel } from '@entities/product/model/enums';
import CartAddItem from '@features/order/ui/CartAddItem';
import SubscribeProductStatus from '@features/subscription/ui/ProductStatusSubscribe';

interface Props {
    product: ProductPreviewModel
}

const HistoryProductCard: FC<Props> = ({ product }) => {
    return (
        <ProductCardPreview
            product={product}
            renderBottomOptions={p => (
                <>
                    <WishlistItemAdd productId={p.id} />
                    {
                        p.status === ProductStatusModel.AVAILABLE
                            ? <CartAddItem productId={p.id} />
                            : <SubscribeProductStatus productId={p.id} />
                    }
                </>
            )}
        />
    );
};

export default HistoryProductCard;
