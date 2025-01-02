import { FC, PropsWithChildren } from "react";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import WishListBadge from "@widgets/wishlist/ui/WishlistBadge";
import CartBadge from "@widgets/order/ui/CartBadge";
import { getCategoryList } from "@entities/category/api";
import LanguageSwitch from "@widgets/header/ui/LanguageSwitch";
import AppLink from "@shared/ui/AppLink";
import { APP_NAME } from "@shared/constants/content";
import { WISHLISTS_QUERY } from "@entities/wishlist/constants/queryKeys";
import { getWishList } from "@entities/wishlist/api";
import { CART_QUERY } from "@entities/order/constants/queryKeys";
import { getCart } from "@entities/order/api";

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
    const categories = await getCategoryList();
    const queryClient = new QueryClient();

    await Promise.all<void>([
        queryClient.prefetchQuery({
            queryKey: [WISHLISTS_QUERY],
            queryFn: getWishList,
            staleTime: 60 * 60 * 1000,
        }),
        queryClient.prefetchQuery({
            queryKey: [CART_QUERY],
            queryFn: getCart,
            staleTime: 60 * 60 * 1000,
        }),
    ]);

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className="w-[1200px] flex flex-col gap-4 my-4">
                <header className="flex flex-col gap-2">
                    <div className="flex justify-between">
                        <AppLink href="/">{APP_NAME}</AppLink>
                        <input className="flex-grow" />
                        <ul className="flex gap-4">
                            <LanguageSwitch />
                            <li>
                                <WishListBadge />
                            </li>
                            <li><CartBadge /></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex gap-4">
                            {categories.map(category => (
                                <li key={category.id}>
                                    <AppLink href={`/${category.url}`}>{category.title}</AppLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </header>
                {children}
            </div>
        </HydrationBoundary>
    );
}

export default MainLayout;
