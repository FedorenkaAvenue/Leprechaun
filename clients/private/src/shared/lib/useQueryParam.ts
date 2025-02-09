import { useState } from "react";
import { useSearchParams } from "react-router";

/**
 * @param {Array} queryParam array of requested query parameters
 * @param {Record<Q, string>} defaultValue default query parameters. Doesn'n set them to the URL
 * @returns {Record<Q, string>} object with requested query parameters
 * @example const [params, setParams] = useQueryParam<keyof typeof URL_QUERY_PARAMS>(['page', 'category']);
 */
export default function useQueryParam<Q extends string | number | symbol>(
    queryParam: Q[],
    defaultValue?: Record<Q, string>,
): [Record<Q, string>, (state: Record<Q, string>) => void] {
    const [searchParams, setSearchParams] = useSearchParams();
    const [param, setParam] = useState<Record<Q, string>>(
        queryParam.reduce((acc, p) => {
            return {
                ...acc,
                [p]: searchParams.get(String(p)) || (defaultValue && defaultValue[p]) || undefined,
            };
        }, {} as Record<Q, string>)
    );

    function changeParam(param: Record<Q, string>): void {
        setParam(param);
        setSearchParams(
            {
                ...Object.fromEntries(searchParams.entries()), // rest query parameters which are not taken by hook
                ...Object.fromEntries<string>(Object.entries<string>(param).filter(([_, v]) => v !== undefined)), // exclude query parameters with === undefined
            },
            { flushSync: true },
        )
    }

    return [param, changeParam];
}
