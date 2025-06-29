import { FC } from 'react';

import Counter from '@shared/ui/Counter';
import { useChangeOrderItemAmount } from '../model/hook';
import { OrderItemPublic } from '@gen/order';

interface Props {
    orderItem: OrderItemPublic
}

const CartChangeItemAmount: FC<Props> = ({ orderItem }) => {
    const { mutate } = useChangeOrderItemAmount(orderItem.id);

    return <Counter amount={orderItem.amount} handleChange={mutate} />;
};

export default CartChangeItemAmount;
