import { inter } from "@shared/lib/fonts";
import Link from "next/link";

import '../globals.css';
import cn from "@shared/lib/cn";
import WishListBadge from "@widgets/wishlist/ui/WishlistBadge";
import CartBadge from "@widgets/order/ui/CartBadge";
import QueryClientProvider from "@shared/providers/QueryClient";
import { getCategoryList } from "@entities/category/api";

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const categories = await getCategoryList();

    return (
        <html lang="en">
            <body className={cn('flex justify-center', inter.className)}>
                <QueryClientProvider>
                    <div className="w-[1200px] flex flex-col gap-4 my-4">
                        <header className="flex flex-col gap-2">
                            <div className="flex justify-between">
                                <Link href="/">Leprechaun</Link>
                                <input />
                                <ul className="flex gap-4">
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
            </body>
        </html>
    );
}
