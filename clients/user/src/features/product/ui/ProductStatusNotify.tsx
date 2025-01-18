'use client'

import { BellRingIcon } from 'lucide-react';
import { FC } from 'react';

import IconButton from '@shared/ui/IconButton';
import { ProductCardModel } from '@entities/product/model/interfaces';

interface Props {
    productId: ProductCardModel['id']
}

const ProductStatusNotify: FC<Props> = ({ productId }) => {
    return (
        <IconButton onClick={() => alert('TODO')}>
            <BellRingIcon />
        </IconButton>
    );
};

export default ProductStatusNotify;
