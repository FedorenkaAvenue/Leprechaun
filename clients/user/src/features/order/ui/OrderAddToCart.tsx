'use client';

import { ShoppingCartIcon, Loader } from 'lucide-react';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { useAddOrderItem } from "../model/hook";
import { ProductCardModel } from '@entities/product/model/interfaces';
import { useCart } from '@entities/order/model/hooks';
import IconButton from '@shared/ui/IconButton';

interface Props {
    productId: ProductCardModel['id']
}

const OrderAddToCart: FC<Props> = ({ productId }) => {
    const router = useRouter();
    const { data, isFetching } = useCart();
    const { mutate: add } = useAddOrderItem();
    const isSelected = data?.list.find(i => i.product.id === productId);

    function onClick() {
        isSelected ? router.push('/cart') : add({ product: productId, amount: 1 });
    }

    return isFetching
        ? <Loader />
        : (
            <IconButton onClick={onClick}>
                <ShoppingCartIcon style={{ color: isSelected ? 'green' : 'gray' }} />
            </IconButton>
        );
};

export default OrderAddToCart;
