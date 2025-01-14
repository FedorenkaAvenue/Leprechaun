import { FC } from 'react';

import { OrderItemModel } from '@entities/order/model/interfaces';
import OrderItemCard from '@entities/order/ui/OrderItemCard';
import OrderItemChangeAmount from '@features/order/ui/OrderChangeItemAmount';
import OrderRemoveItem from '@features/order/ui/OrderRemoveItem';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';

type Props = OrderItemModel;

const CartItem: FC<Props> = (item) => {
    return (
        <OrderItemCard
            item={item}
            renderAmount={item => (
                <OrderItemChangeAmount orderItem={item} />
            )}
            renderOptions={item => (
                <div className='flex gap-1'>
                    <WishlistItemAdd productId={item.product.id} />
                    <OrderRemoveItem itemId={item.id} />
                </div>
            )}
        />
    );
};

export default CartItem;
