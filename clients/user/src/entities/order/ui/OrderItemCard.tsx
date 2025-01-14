import Image from 'next/image';
import { FC, ReactNode } from 'react';

import ProductLabel from '@entities/product/ui/ProductLabel';
import { OrderItemModel } from '../model/interfaces';
import Price from '@shared/ui/Price';
import { Card } from '@primitives/ui/card';
import AppLink from '@shared/ui/AppLink';
import { Skeleton } from '@primitives/ui/skeleton';

interface Props {
    item: OrderItemModel
    renderAmount?: (item: OrderItemModel) => ReactNode
    renderOptions?: (item: OrderItemModel) => ReactNode
}

const OrderItemCard: FC<Props> = ({ item, renderAmount, renderOptions }) => {
    return (
        <Card className='flex gap-2 justify-between h-full min-h-32' size='tiny'>
            <div className='flex'>
                <AppLink href={`/product/${item.product.id}`} className='flex h-full'>
                    <Image
                        src={'/' + item.product.image}
                        width="100" height="100"
                        alt={item.product.title}
                        className='object-contain'
                    />
                </AppLink>
            </div>
            <div className='flex flex-col gap-2 flex-grow justify-center items-start'>
                <AppLink href={`/product/${item.product.id}`}>
                    <div>{item.product.title}</div>
                </AppLink>
                {item.product.labels.length > 0 && (
                    <ul>
                        {item.product.labels.map((v, i) => (
                            <li key={i}>
                                <ProductLabel type={v.type} value={v.value} />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className='flex flex-col items-end justify-between h-full'>
                {renderOptions?.call(null, item)}
                <div className='flex gap-3'>
                    <Price price={item.summaryPrice} classNames='text-right' />
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
