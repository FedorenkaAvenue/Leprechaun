"use client";

import { QueryClient, QueryClientProvider as QClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';

const QUERY_CLIENT = new QueryClient();

export default function QueryClientProvider({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => QUERY_CLIENT);

    return (
        <QClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QClientProvider>
    );
}
