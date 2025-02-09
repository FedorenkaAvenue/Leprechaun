'use client';

import { ShoppingCartIcon, Loader } from 'lucide-react';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { useAddOrderItems } from '../model/hook';
import { ProductCardModel } from '@entities/product/model/interfaces';
import { useCart } from '@entities/order/model/hooks';
import IconButton from '@shared/ui/IconButton';
import { twConfig } from '@root/tailwind.config';

interface Props {
    productId: ProductCardModel['id']
}

const CartAddItem: FC<Props> = ({ productId }) => {
    const router = useRouter();
    const { data, isFetching } = useCart();
    const { mutate: add } = useAddOrderItems();
    const isSelected = data?.items.find(({ product: { id } }) => id === productId);

    function onClick() {
        isSelected ? router.push('/cart') : add([{ product: productId, amount: 1 }]);
    }

    return isFetching
        ? <Loader />
        : (
            <IconButton onClick={onClick} customIcon>
                <ShoppingCartIcon style={{ color: isSelected && twConfig.theme.colors.success }} />
            </IconButton>
        );
};

export default CartAddItem;
