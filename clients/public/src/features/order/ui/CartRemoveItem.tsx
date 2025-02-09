import { FC } from 'react';
import { Trash } from 'lucide-react';

import { useRemoveOrderItem } from '../model/hook';
import { OrderItemModel } from '@entities/order/model/interfaces';
import IconButton from '@shared/ui/IconButton';

interface Props {
    itemId: OrderItemModel['id']
}

const CartRemoveItem: FC<Props> = ({ itemId }) => {
    const { mutate } = useRemoveOrderItem(itemId);

    return <IconButton onClick={() => mutate()}><Trash /></IconButton>;
};

export default CartRemoveItem;
