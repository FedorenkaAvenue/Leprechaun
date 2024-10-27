import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const cacheClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (data) => {
            //@ts-ignore
            const message = data?.response?.data?.message;
            toast.error(message || "Something wrong..")
        },
    }),
    mutationCache: new MutationCache({
        onSuccess: () => {
            toast.success("Success");
        },
        onError: (data) => {
            //@ts-ignore
            const message = data?.response?.data?.message;
            toast.error(message || "Something wrong..")
        },
    }),
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
});

export default cacheClient;
