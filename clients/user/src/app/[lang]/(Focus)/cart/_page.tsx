'use client';

import { FC } from 'react';

import { useCart } from '@entities/order/model/hooks';
import { useI18n } from '@shared/lib/i18n_client';
import CartItem from '@widgets/order/ui/CartItem';
import { Card } from '@primitives/ui/card';
import Grid from '@shared/ui/Grid';

const Cart: FC = () => {
    const { data } = useCart();
    const { dictionary } = useI18n();

    if (typeof data === 'object' && (!data || data?.items.length === 0)) {
        return (
            <div>{dictionary?.cart.emptyCart}</div>
        )
    }

    return (
        <section>
            <h1 className='mb-6'>{dictionary?.cart.cart}</h1>
            <Grid className='justify-between' size='xl'>
                <Grid direction='column' className='flex-grow'>
                    {data?.items.map(i => <li key={i.id}><CartItem {...i} /></li>)}
                </Grid>
                <Card>
                    <div>{dictionary?.cart.summaryProductAmount}: {data?.summary.productsAmount}</div>
                    <div>{dictionary?.cart.summaryPrice}: {data?.summary.price}</div>
                </Card>
            </Grid>
        </section>
    );
};

export default Cart;
