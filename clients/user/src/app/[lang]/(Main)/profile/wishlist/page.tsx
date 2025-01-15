import { Metadata } from 'next';

import WishlistClient from './_page';
import { getDictionary } from '@shared/lib/i18n_server';
import { RouteProps } from '@shared/models/router';

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { wishList } = await getDictionary((await params).lang);

    return {
        title: wishList.wishlists,
    }
}

export default async function Wishlist() {
    return <WishlistClient />;
}
