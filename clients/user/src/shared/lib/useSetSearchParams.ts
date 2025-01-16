import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Queries = Record<string, string | number | null | undefined>;

export default function useSetSearchParams(): (queries: Queries) => void {
    const { push } = useRouter();
    const searchParams = useSearchParams();

    const setQueries = useCallback((queries: Queries): void => {
        const params = new URLSearchParams(searchParams.toString());

        Object.keys(queries).forEach(q => params.set(q, String(queries[q])));
        push(`?${params.toString()}`);
    }, [searchParams]);

    return setQueries;
}
