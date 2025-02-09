import { MutationCache, QueryClientConfig } from "@tanstack/react-query";

import { toast } from "@primitives/hooks/use-toast";

const queryClientConfig: QueryClientConfig = {
    mutationCache: new MutationCache({
        onError(err) {
            if (err.message.startsWith('5')) {
                toast({ title: 'Oops..', description: 'Something gonna wrong. Please, try again later' })
            }
        },
    }),
    defaultOptions: {
        queries: {
            // With SSR, we usually want to set some default staleTime above 0 to avoid refetching immediately on the client
            staleTime: 60 * 60 * 1000,
        },
    },
}

export default queryClientConfig;
