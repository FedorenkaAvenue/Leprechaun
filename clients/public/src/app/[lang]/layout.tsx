import { FC, PropsWithChildren } from 'react';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { Metadata } from 'next';

import '../globals.css';
import { inter } from '@shared/lib/fonts';
import { getDictionary } from '@shared/lib/i18n_server';
import { I18nProvider } from '@shared/providers/i18n';
import QueryClientProvider from '@shared/providers/QueryClient';
import { WISHLISTS_QUERY } from '@entities/wishlist/constants/queryKeys';
import { getWishLists } from '@entities/wishlist/api';
import { CART_QUERY } from '@entities/order/constants/queryKeys';
import { getCart } from '@entities/order/api';
import { PRODUCT_HISTORY_QUERY } from '@entities/history/constants/queryKeys';
import { getProductHistory } from '@entities/history/api';
import { APP_NAME } from '@shared/constants/content';
import { RouteProps } from '@shared/models/router';
import { cn } from '@shared/ui/primitives/lib/utils';
import { Toaster } from '@primitives/ui/toaster';
import { CartProvider } from '@entities/order/model/providers';
import { SUBSCRIBTION_PRODUCT_STATUS } from '@entities/subscribtion/constants/queryKeys';
import { getProductStatusSubscriptions } from '@entities/subscribtion/api';

const Socket = dynamic(() => import('./socket'));

export const metadata: Metadata = {
    title: {
        template: `%s | ${APP_NAME}`,
        default: APP_NAME as string,
    },
}

const RootLayout: FC<PropsWithChildren<RouteProps>> = async ({ params, children }) => {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { staleTime: 5 * 60 * 1000 },
        },
    });

    await Promise.all<void>([
        queryClient.prefetchQuery({ queryKey: [WISHLISTS_QUERY], queryFn: getWishLists }),
        queryClient.prefetchQuery({ queryKey: [CART_QUERY], queryFn: getCart }),
        queryClient.prefetchQuery({ queryKey: [PRODUCT_HISTORY_QUERY], queryFn: getProductHistory }),
        queryClient.prefetchQuery({ queryKey: [SUBSCRIBTION_PRODUCT_STATUS], queryFn: getProductStatusSubscriptions })
    ]);

    return (
        <html lang={lang}>
            <body className={cn('flex justify-center', inter.className)}>
                <QueryClientProvider>
                    <HydrationBoundary state={dehydrate(queryClient)}>
                        <I18nProvider dictionary={dict} lang={lang}>
                            <CartProvider>
                                {children}
                            </CartProvider>
                        </I18nProvider>
                        <Socket />
                    </HydrationBoundary>
                </QueryClientProvider>
                <Toaster />
            </body>
        </html>
    );
}

export default RootLayout;
