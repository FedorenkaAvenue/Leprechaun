import Image from 'next/image';
import { FC, ReactNode } from 'react';

import ProductLabel from '@entities/product/ui/ProductLabel';
import { OrderItemModel } from '../model/interfaces';
import Price from '@shared/ui/Price';

interface Props {
    item: OrderItemModel
    renderAmount?: (item: OrderItemModel) => ReactNode
    renderOptions?: (item: OrderItemModel) => ReactNode
}

const OrderItemCard: FC<Props> = ({ item, renderAmount, renderOptions }) => {
    return (
        <div className='flex gap-2 items-center'>
            <div>
                {item.product.labels.map((v, i) => (
                    <ProductLabel key={i} type={v.type} value={v.value} />
                ))}
                <Image src={'/' + item.product.image} width="100" height="200" alt={item.product.title} />
                <div>{item.product.title}</div>
            </div>
            <div className='flex gap-2'>
                {renderAmount?.call(null, item)}
                <div><Price {...item.summaryPrice} /></div>
            </div>
            {renderOptions?.call(null, item)}
        </div>
    );
};

export default OrderItemCard;
