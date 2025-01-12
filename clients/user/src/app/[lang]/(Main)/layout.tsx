import { FC, PropsWithChildren } from "react";

import WishListBadge from "@widgets/wishlist/ui/WishlistBadge";
import CartBadge from "@widgets/order/ui/CartBadge";
import { getCategoryList } from "@entities/category/api";
import LanguageSwitch from "@widgets/header/ui/LanguageSwitch";
import AppLink from "@shared/ui/AppLink";
import { APP_NAME } from "@shared/constants/content";

const MainLayout: FC<PropsWithChildren> = async ({ children }) => {
    const categories = await getCategoryList();

    return (
        <div className="w-[1200px] flex flex-col gap-4 my-4">
            <header className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <AppLink href="/">{APP_NAME}</AppLink>
                    <input className="flex-grow" />
                    <ul className="flex items-center gap-4">
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
    );
}

export default MainLayout;
