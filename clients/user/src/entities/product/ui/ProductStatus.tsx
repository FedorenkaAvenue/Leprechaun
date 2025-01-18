'use client';

import { FC } from 'react';
import { cva } from 'class-variance-authority';

import { ProductCardModel } from '../model/interfaces';
import { cn } from '@primitives/lib/utils';
import { useI18n } from '@shared/lib/i18n_client';
import { ProductStatusModel } from '../model/enums';

interface Props {
    status: ProductCardModel['status']
}

const productStatusVariants = cva(
    ['text-xs'],
    {
        variants: {
            status: {
                1: ['text-success'],
                2: ['text-muted-primary-foreground'],
            }
        },
    }
)

const ProductStatus: FC<Props> = ({ status }) => {
    const { dictionary } = useI18n();

    return (
        <div className={cn(productStatusVariants({ status }))}>
            {
                status === ProductStatusModel.AVAILABLE
                    ? dictionary?.product.status.available
                    : status === ProductStatusModel.OUT_OF_STOCK
                        ? dictionary?.product.status.outOfStock
                        : 'NO STATUS'
            }
        </div>
    );
};

export default ProductStatus;
