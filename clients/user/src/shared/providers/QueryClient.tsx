"use client";

import { QueryClient, QueryClientProvider as QClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren, useState } from 'react';

export default function QueryClientProvider({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QClientProvider>
    );
}
