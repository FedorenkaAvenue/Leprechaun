'use client';

import { FC } from 'react';
import { cva } from 'class-variance-authority';

import { cn } from '@primitives/lib/utils';
import { useI18n } from '@shared/lib/i18n_client';
import { ProductStatus } from '@gen/product';

interface Props {
    status: ProductStatus
}

const productStatusVariants = cva(
    ['text-xs'],
    {
        variants: {
            status: {
                [ProductStatus.AVAILABLE_STATUS]: ['text-success'],
                [ProductStatus.OUT_OF_STOCK_STATUS]: ['text-muted-primary-foreground'],
                [ProductStatus.UNRECOGNIZED]: [], // ? WTF
            },
        },
    },
)

const ProductStatusEntity: FC<Props> = ({ status }) => {
    const { dictionary } = useI18n();

    return (
        <div className={cn(productStatusVariants({ status }))}>
            {
                status === ProductStatus.AVAILABLE_STATUS
                    ? dictionary?.product.status.available
                    : status === ProductStatus.OUT_OF_STOCK_STATUS
                        ? dictionary?.product.status.outOfStock
                        : 'NO STATUS'
            }
        </div>
    );
};

export default ProductStatusEntity;
