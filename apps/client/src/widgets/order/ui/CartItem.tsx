import { FC } from 'react';

import OrderItemCard from '@entities/order/ui/OrderItemCard';
import OrderItemChangeAmount from '@features/order/ui/CartChangeItemAmount';
import CartRemoveItem from '@features/order/ui/CartRemoveItem';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';
import SubscribeProductStatus from '@features/subscription/ui/ProductStatusSubscribe';
import { OrderItemPublic } from '@gen/order';
import { ProductStatus } from '@gen/product';

type Props = OrderItemPublic;

const CartItem: FC<Props> = item => {
    const isAvailable = item.product.status === ProductStatus.AVAILABLE_STATUS;

    return (
        <OrderItemCard
            item={item}
            renderAmount={isAvailable ? item => <OrderItemChangeAmount orderItem={item} /> : undefined}
            renderOptions={item => (
                <div className='flex gap-2'>
                    <CartRemoveItem itemId={item.id} />
                    {
                        isAvailable
                            ? <WishlistItemAdd productId={item.product.id} />
                            : <SubscribeProductStatus productId={item.product.id} />
                    }
                </div>
            )}
        />
    );
};

export default CartItem;
