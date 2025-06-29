import Image from 'next/image';
import { FC, ReactNode } from 'react';

import ProductLabel from '@entities/product/ui/ProductLabel';
import Price from '@shared/ui/Price';
import { Card } from '@primitives/ui/card';
import AppLink from '@shared/ui/AppLink';
import { Skeleton } from '@primitives/ui/skeleton';
import { cn } from '@primitives/lib/utils';
import ProductStatusEntity from '@entities/product/ui/ProductStatus';
import { OrderItemPublic } from '@gen/order';
import { ProductStatus } from '@gen/product';

interface Props {
    item: OrderItemPublic
    renderAmount?: (item: OrderItemPublic) => ReactNode
    renderOptions?: (item: OrderItemPublic) => ReactNode
}

const OrderItemCard: FC<Props> = ({ item, renderAmount, renderOptions }) => {
    const { product: { id, image, title, labels, status }, summaryPrice } = item;
    const isAvailable = status === ProductStatus.AVAILABLE_STATUS;

    return (
        <Card element='article' className='flex gap-2 justify-between h-full min-h-32' size='tiny'>
            <div className={cn('flex', !isAvailable && 'opacity-35')}>
                <AppLink href={`/product/${id}`} className='flex h-full'>
                    <Image
                        src={image?.src || '/static/no_image.png'}
                        width='100' height='100'
                        alt={title}
                        className='object-contain'
                    />
                </AppLink>
            </div>
            <div className={cn(
                'flex flex-col gap-2 flex-grow justify-center items-start',
                !isAvailable && 'opacity-35',
            )}>
                <AppLink href={`/product/${id}`}>
                    <div>{title}</div>
                </AppLink>
                {labels.length > 0 && (
                    <ul>
                        {labels.map((label, i) => (
                            <li key={i}><ProductLabel type={label.type} value={label.value} /></li>
                        ))}
                    </ul>
                )}
                {!isAvailable && <ProductStatusEntity status={status} />}
            </div>
            <div className='flex flex-col items-end justify-between h-full'>
                {renderOptions?.call(null, item)}
                <div className='flex gap-3'>
                    <Price price={summaryPrice} isUnavailable={!isAvailable} classNames='text-right' />
                    {renderAmount?.call(null, item)}
                </div>
            </div>
        </Card>
    );
};

export const OrderItemCardSkeleton: FC = () => (
    <Skeleton type='card' className='flex gap-2 justify-between p-2'>
        <Skeleton className='w-24 h-24' />
        <div className='flex flex-col gap-2 justify-center items-start flex-grow'>
            <Skeleton className='w-40 h-5' />
            <Skeleton className='w-40 h-5' />
        </div>
        <div>
            <Skeleton />
        </div>
    </Skeleton>
)

export default OrderItemCard;
