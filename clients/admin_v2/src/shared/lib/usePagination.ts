import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";

const QUERY_SEARCH_PARAM = 'page';

export default function usePagination(): [number, (event: React.ChangeEvent<unknown>, page: number) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState<number>(Number(searchParams.get(QUERY_SEARCH_PARAM)) || 1);

    const changePage = useCallback((_: React.ChangeEvent<unknown>, page: number): void => {
        setPage(page);
        setSearchParams({ [QUERY_SEARCH_PARAM]: String(page) }, { flushSync: true });
    }, []);

    return [page, changePage];
}
