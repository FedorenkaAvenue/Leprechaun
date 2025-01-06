import { Metadata } from 'next';

import { RouteProps } from '@shared/models/router';
import WishlistClient from './_page';
import { getDictionary } from '@shared/lib/i18n_server';

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { wishList } = await getDictionary((await params).lang);

    return {
        title: wishList.wishlist,
    }
}

export default async function Wishlist({ params }: RouteProps<{ id: string }>) {
    const { id } = await params;

    return <WishlistClient wishlistId={id} />;
};
