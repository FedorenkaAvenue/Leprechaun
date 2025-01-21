'use client'

import { FC, PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { isServer, QueryClient, QueryClientProvider as QClientProvider } from '@tanstack/react-query';

import queryClientConfig from '@shared/configs/queryClient';

function makeQueryClient() {
    return new QueryClient(queryClientConfig);
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
