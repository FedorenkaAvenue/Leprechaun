'use client';

import { ShoppingCartIcon, Loader } from 'lucide-react';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

import { useAddOrderItem } from "../api/hook";
import { ProductCardModel } from '@entities/product/models/Product';
import { useCart } from '@entities/order/api/hooks';

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
        : <ShoppingCartIcon
            onClick={onClick}
            style={{ color: isSelected ? 'green' : 'gray' }}
        />;
};

export default OrderAddToCart;
