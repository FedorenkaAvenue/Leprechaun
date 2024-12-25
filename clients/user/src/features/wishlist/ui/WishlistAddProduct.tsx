'use client';

import { FC } from 'react';
import { Heart, Loader } from 'lucide-react';

import { ProductCardModel } from '@entities/product/models/Product';
import { useAddProductToWishlist, useRemoveProductFromWishlist } from '../api/hooks';
import { useWishList } from '@entities/wishlist/api/hook';

interface Props {
    productId: ProductCardModel['id']
}

const WishlistAddProduct: FC<Props> = ({ productId }) => {
    const { data, isFetching } = useWishList();
    const { mutate: add } = useAddProductToWishlist(productId);
    const selected = data?.flatMap(({ items }) => items).find(({ product }) => product.id === productId);
    const { mutate: remove } = useRemoveProductFromWishlist(selected?.id);

    function toogle() {
        selected ? remove() : add()
    }

    return isFetching
        ? <Loader />
        : <Heart
            className='cursor-pointer'
            style={{ color: selected ? 'red' : 'gray' }}
            onClick={toogle}
        />;
};

export default WishlistAddProduct;
