import Link from "next/link";

import { inter } from "@shared/lib/fonts";
import '../globals.css';
import cn from "@shared/lib/cn";
import WishListBadge from "@widgets/wishlist/ui/WishlistBadge";
import CartBadge from "@widgets/order/ui/CartBadge";
import QueryClientProvider from "@shared/providers/QueryClient";
import { getCategoryList } from "@entities/category/api";
import LanguageSwitch from "@widgets/header/ui/LanguageSwitch";
import { getDictionary } from "@shared/lib/i18n";
import { DictionaryProvider } from "@shared/providers/i18n";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const categories = await getCategoryList();
    const dict = await getDictionary('ua');

    return (
        <html lang="en">
            <body className={cn('flex justify-center', inter.className)}>
                <DictionaryProvider dictionary={dict}>
                    <QueryClientProvider>
                        <div className="w-[1200px] flex flex-col gap-4 my-4">
                            <header className="flex flex-col gap-2">
                                <div className="flex justify-between">
                                    <Link href="/">{process.env.APP_NAME}</Link>
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
                                        {categories.map(i => (
                                            <li key={i.id}>
                                                <Link href={`/${i.url}`}>{i.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </header>
                            {children}
                        </div>
                    </QueryClientProvider>
                </DictionaryProvider>
            </body>
        </html>
    );
}
