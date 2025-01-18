'use client';

import { FC } from 'react';

import { useCart } from '@entities/order/model/hooks';
import { useI18n } from '@shared/lib/i18n_client';
import CartItem from '@widgets/order/ui/CartItem';
import { Card } from '@primitives/ui/card';
import Grid from '@shared/ui/Grid';
import Loading from './loading';

const Cart: FC = () => {
    const { data, isUpdating } = useCart();
    const { dictionary } = useI18n();

    if (typeof data === 'object' && (!data || data?.items.length === 0)) {
        return (
            <div>{dictionary?.cart.emptyCart}</div>
        )
    }

    if (isUpdating) return <Loading />;

    return (
        <div className='flex justify-between gap-4'>
            <div className='flex-grow'>
                <Grid className='mb-6'>
                    {data?.items.map(i => <li key={i.id}><CartItem {...i} /></li>)}
                </Grid>
                <div>
                    <div className='text-muted-primary-foreground'>{dictionary?.cart.unvailableItems}</div>
                    <Grid>
                        {data?.unavailableItems.map(i => <li key={i.id}><CartItem {...i} /></li>)}
                    </Grid>
                </div>
            </div>
            <Card className='whitespace-nowrap'>
                <div>{dictionary?.cart.summaryProductAmount}: {data?.summary.productsAmount}</div>
                <div>{dictionary?.cart.summaryPrice}: {data?.summary.price}</div>
            </Card>
        </div>
    );
};

export default Cart;
