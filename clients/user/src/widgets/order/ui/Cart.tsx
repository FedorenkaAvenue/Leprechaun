import { FC } from 'react';

import { CartModel } from '@entities/order/model/Cart';
import { OrderItemModel } from '@entities/order/model/OrderItem';
import OrderItemCard from '@entities/order/ui/OrderItemCard';
import OrderItemChangeAmount from '@features/order/ui/OrderChangeItemAmount';
import OrderRemoveItem from '@features/order/ui/OrderRemoveItem';

type OrderItemCardProps = OrderItemModel;

const ItemCard: FC<OrderItemCardProps> = (item) => {
    return (
        <OrderItemCard
            item={item}
            renderAmount={item => (
                <OrderItemChangeAmount orderItem={item} />
            )}
            renderOptions={item => (
                <OrderRemoveItem itemId={item.id} />
            )}
        />
    );
};

interface Props {
    data: CartModel | undefined
}

const Cart: FC<Props> = ({ data }) => {
    return (
        <div className='flex justify-between'>
            <ul className='flex flex-col gap-5'>
                {data?.list.map(i => (
                    <li key={i.id}>
                        <ItemCard {...i} />
                    </li>
                ))}
            </ul>
            <div>
                <div>summary Price: {data?.summary.price}</div>
                <div>items amount: {data?.summary.productsAmount}</div>
            </div>
        </div>
    );
};

export default Cart;
