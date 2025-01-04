import { FC, PropsWithChildren } from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import '../globals.css';
import { inter } from "@shared/lib/fonts";
import cn from "@shared/lib/cn";
import { getDictionary } from "@shared/lib/i18n_server";
import { I18nProvider } from "@shared/providers/i18n";
import QueryClientProvider from "@shared/providers/QueryClient";
import { WISHLISTS_QUERY } from "@entities/wishlist/constants/queryKeys";
import { getWishList } from "@entities/wishlist/api";
import { CART_QUERY } from "@entities/order/constants/queryKeys";
import { getCart } from "@entities/order/api";
import { PRODUCT_HISTORY_QUERY } from "@entities/history/constants/queryKeys";
import { getProductHistory } from "@entities/history/api";

interface Props {
    params: { lang: string }
}

const RootLayout: FC<PropsWithChildren<Props>> = async ({ params, children }) => {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { staleTime: Infinity },
        },
    });

    await Promise.all<void>([
        queryClient.prefetchQuery({ queryKey: [WISHLISTS_QUERY], queryFn: getWishList }),
        queryClient.prefetchQuery({ queryKey: [CART_QUERY], queryFn: getCart }),
        queryClient.prefetchQuery({ queryKey: [PRODUCT_HISTORY_QUERY], queryFn: getProductHistory }),
    ]);

    return (
        <html lang={lang}>
            <body className={cn('flex justify-center', inter.className)}>
                <QueryClientProvider>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <I18nProvider dictionary={dict} lang={lang}>
                            {children}
                        </I18nProvider>
                    </HydrationBoundary>
                </QueryClientProvider>

            </body>
        </html>
    );
}

export default RootLayout;
