import { FC } from 'react';

import { ProductPreviewModel } from '@entities/product/model/interfaces';
import { ProductCardPreview } from '@entities/product/ui/ProductCards';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';
import ProductStatusNotify from '@features/product/ui/ProductStatusNotify';
import { ProductStatusModel } from '@entities/product/model/enums';
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
                    <WishlistItemAdd productId={p.id} />
                    {
                        p.status === ProductStatusModel.AVAILABLE
                            ? <CartAddItem productId={p.id} />
                            : <ProductStatusNotify productId={p.id} />
                    }
                </>
            )}
        />
    );
};

export default HistoryProductCard;
