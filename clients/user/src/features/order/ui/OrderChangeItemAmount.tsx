import { FC } from 'react';

import { OrderItemModel } from '@entities/order/model/OrderItem';
import Counter from '@shared/ui/Counter';
import { useChangeOrderItemAmount } from '../api/hook';

interface Props {
    orderItem: OrderItemModel
}

const OrderItemChangeAmount: FC<Props> = ({ orderItem }) => {
    const { mutate } = useChangeOrderItemAmount(orderItem.id);

    return (
        <Counter amount={orderItem.amount} handleChange={mutate} />
    );
};

export default OrderItemChangeAmount;
