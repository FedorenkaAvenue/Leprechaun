'use client';

import { ShoppingCartIcon } from 'lucide-react';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { useAddOrderItems } from '../model/hook';
import { ProductCardModel } from '@entities/product/model/interfaces';
import { useCart } from '@entities/order/model/hooks';
import IconButton from '@shared/ui/IconButton';
import { twConfig } from '@root/tailwind.config';
import { Button } from '@primitives/ui/button';
import { useI18n } from '@shared/lib/i18n_client';

interface Props {
    productId: ProductCardModel['id']
    type?: CartAddItemType
}

type CartAddItemType = 'icon' | 'button';

const CartAddItem: FC<Props> = ({ productId, type = 'icon' }) => {
    const { dictionary } = useI18n();
    const router = useRouter();
    const { data, isFetching } = useCart();
    const { mutate: add } = useAddOrderItems();
    const isSelected = data?.items.find(({ product: { id } }) => id === productId);

    function onClick() {
        isSelected ? router.push('/cart') : add([{ product: productId, amount: 1 }]);
    }

    return type === 'icon'
        ? (
            <IconButton onClick={onClick} isLoading={isFetching} customIcon>
                <ShoppingCartIcon style={{ color: isSelected && twConfig.theme.colors.success }} />
            </IconButton>
        )
        : (
            <Button onClick={onClick} isLoading={isFetching} className='w-full'>
                {isSelected ? dictionary?.cart.goToCart : dictionary?.cart.addToCart}
            </Button>
        )
};

export default CartAddItem;
