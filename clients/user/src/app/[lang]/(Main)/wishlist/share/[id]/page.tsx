import { Metadata } from "next";

import { getWishlist } from "@entities/wishlist/api"
import WishlistAddToCart from "@features/wishlist/ui/WishlistAddToCart";
import { getDictionary } from "@shared/lib/i18n_server";
import { RouteProps } from "@shared/models/router";
import WishlistProductCard from "@widgets/wishlist/ui/WishlistProductCard";

type Props = RouteProps<{ id: string }>

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
    const { wishList } = await getDictionary((await params).lang);

    return {
        title: wishList.sharedList,
    }
}

export default async function WishlistShare({ params }: Props) {
    const { id, lang } = await params;
    const [wishlist, dictionary] = await Promise.all([getWishlist(id), getDictionary(lang)]);

    return (
        <div className='flex flex-col gap-4'>
            <div className='flex justify-between'>
                {
                    wishlist.title
                        ? (
                            <div>
                                <h1 className='inline-block'>{wishlist?.title}</h1>
                                <span>&#32;({dictionary.wishList.sharedList})</span>
                            </div>
                        )
                        : <div>{dictionary.wishList.sharedList}</div>
                }
                <WishlistAddToCart wishlist={wishlist} />
            </div>
            <ul className='flex gap-1'>
                {wishlist.items.map(i => (
                    <li key={i.id}>
                        <WishlistProductCard item={i} shared />
                    </li>
                ))}
            </ul>
        </div>
    )
}
