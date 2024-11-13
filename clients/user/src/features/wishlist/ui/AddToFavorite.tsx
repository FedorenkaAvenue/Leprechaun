'use client';

import { FC } from 'react';
import { Heart, Loader } from 'lucide-react';

import { ProductCardModel } from '@entities/product/models/Product';
import { useAddProductToFavorite, useRemoveProductToFavorite } from '../api/hooks';
import { useWishList } from '@entities/wishlist/api/hook';

interface Props {
    productId: ProductCardModel['id']
}

const ProductAddToFavorite: FC<Props> = ({ productId }) => {
    const { data, isFetching } = useWishList();
    const { mutate: add } = useAddProductToFavorite(productId);
    const selected = data?.find(i => i.product.id === productId);
    const { mutate: remove } = useRemoveProductToFavorite(selected?.id);

    function toogle() {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        selected ? remove() : add()
    }

    return isFetching
        ? <Loader />
        : <Heart
            style={{ color: selected ? 'red' : 'gray' }}
            onClick={toogle}
        />;
};

export default ProductAddToFavorite;
