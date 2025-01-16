import { Metadata } from 'next';

import WishlistClient from './_page';
import { getDictionary } from '@shared/lib/i18n_server';
import { RouteProps } from '@shared/models/router';
import WishlistCreate from '@widgets/wishlist/ui/WIshlistCreate';

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { wishList } = await getDictionary((await params).lang);

    return {
        title: wishList.wishlists,
    }
}

export default async function Wishlist({ params }: RouteProps) {
    const { wishList } = await getDictionary((await params).lang);

    return (
        <section>
            <div className='flex justify-between mb-5'>
                <h1>{wishList.wishlists}</h1>
                <WishlistCreate />
            </div>
            <WishlistClient />
        </section>
    );
}
