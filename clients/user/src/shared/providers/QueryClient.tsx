'use client'

import { isServer, QueryClient, QueryClientProvider as QClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, PropsWithChildren } from 'react';

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime above 0 to avoid refetching immediately on the client
                staleTime: 60 * 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
    if (isServer) {
        return makeQueryClient();
    } else {
        if (!browserQueryClient) browserQueryClient = makeQueryClient();

        return browserQueryClient
    }
}

const QueryClientProvider: FC<PropsWithChildren> = ({ children }) => (
    <QClientProvider client={getQueryClient()}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position='right' />
    </QClientProvider>
);

export default QueryClientProvider;
