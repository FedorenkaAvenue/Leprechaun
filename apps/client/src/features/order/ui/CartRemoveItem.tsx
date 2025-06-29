import { FC } from 'react';
import { Trash } from 'lucide-react';

import { useRemoveOrderItem } from '../model/hook';
import IconButton from '@shared/ui/IconButton';
import { OrderItemPublic } from '@gen/order';

interface Props {
    itemId: OrderItemPublic['id']
}

const CartRemoveItem: FC<Props> = ({ itemId }) => {
    const { mutate } = useRemoveOrderItem(itemId);

    return <IconButton onClick={() => mutate()}><Trash /></IconButton>;
};

export default CartRemoveItem;
