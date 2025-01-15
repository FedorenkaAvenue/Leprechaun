import { PropsWithChildren } from 'react';

import { Card } from '@primitives/ui/card';
import { getDictionary } from '@shared/lib/i18n_server';
import { RouteProps } from '@shared/models/router';
import AppLink from '@shared/ui/AppLink';
import Grid from '@shared/ui/Grid';
import WishlistItemsCount from '@features/wishlist/ui/WishlistItemsCount';
import CartItemsCount from '@features/order/ui/CartItemsCount';

type Props = RouteProps;

export default async function Layout({ params, children }: PropsWithChildren<Props>) {
    const dictionary = await getDictionary((await params).lang);

    return (
        <div className='flex gap-4 items-start'>
            <Card element='nav' className='min-w-60'>
                <Grid direction='column' size='l' className='text-sm'>
                    <li>
                        <AppLink href='/profile/orders' withActive>
                            {dictionary.order.myOrders}
                        </AppLink>
                    </li>
                    <li>
                        <AppLink href='/cart'>
                            {dictionary.cart.cart}
                            <CartItemsCount className='float-right' />
                        </AppLink>
                    </li>
                    <li>
                        <AppLink href='/profile/wishlist' withActive>
                            {dictionary.wishList.wishlists}
                            <WishlistItemsCount className='float-right' />
                        </AppLink>
                    </li>
                    <li>
                        <AppLink href='/profile/visited' withActive>
                            {dictionary.history.visitedProducts}
                        </AppLink>
                    </li>
                </Grid>
            </Card>
            <section className='flex-grow'>{children}</section>
        </div>
    )
}
