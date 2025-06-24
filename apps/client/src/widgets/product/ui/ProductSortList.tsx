'use client'

import { FC } from 'react';

import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@primitives/ui/select';
import { useI18n } from '@shared/lib/i18n_client';
import useSetSearchParams from '@shared/lib/useSetSearchParams';
import { ProductSort } from '@gen/product';

interface Props {
    sort: ProductSort | string | undefined
}

const ProductSortList: FC<Props> = ({ sort = ProductSort.POPULAR_SORT }) => {
    const { dictionary } = useI18n();
    const setSeacrhParams = useSetSearchParams();

    function change(nextSort: string): void {
        setSeacrhParams({ sort: nextSort });
    }

    return (
        <Select
            defaultValue={
                Object.values(ProductSort).includes(+sort) ? String(sort) : String(ProductSort.POPULAR_SORT)
            }
            onValueChange={change}
        >
            <SelectTrigger className='w-auto'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value={String(ProductSort.POPULAR_SORT)}>{dictionary?.sort.byPopular}</SelectItem>
                    <SelectItem value={String(ProductSort.NEW_SORT)}>{dictionary?.sort.byNewest}</SelectItem>
                    <SelectItem value={String(ProductSort.PRICE_UP_SORT)}>{dictionary?.sort.byPriceUp}</SelectItem>
                    <SelectItem value={String(ProductSort.PRICE_DOWN_SORT)}>{dictionary?.sort.byPriceDown}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ProductSortList;
