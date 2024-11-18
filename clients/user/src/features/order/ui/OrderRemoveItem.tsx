import { FC } from 'react';
import { Trash } from 'lucide-react';

import { useRemoveOrderItem } from '../api/hook';
import { OrderItemModel } from '@entities/order/model/OrderItem';

interface Props {
    itemId: OrderItemModel['id']
}

const OrderRemoveItem: FC<Props> = ({ itemId }) => {
    const { mutate } = useRemoveOrderItem(itemId);

    return <Trash onClick={() => mutate()} />;
};

export default OrderRemoveItem;
