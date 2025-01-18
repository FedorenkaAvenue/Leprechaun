import { FC } from 'react';

import { OrderItemModel } from '@entities/order/model/interfaces';
import OrderItemCard from '@entities/order/ui/OrderItemCard';
import OrderItemChangeAmount from '@features/order/ui/CartChangeItemAmount';
import CartRemoveItem from '@features/order/ui/CartRemoveItem';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';
import { ProductStatusModel } from '@entities/product/model/enums';
import ProductStatusNotify from '@features/product/ui/ProductStatusNotify';

type Props = OrderItemModel;

const CartItem: FC<Props> = item => {
    const isAvailable = item.product.status === ProductStatusModel.AVAILABLE;

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
                            : <ProductStatusNotify productId={item.product.id} />
                    }
                </div>
            )}
        />
    );
};

export default CartItem;
