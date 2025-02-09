'use client'

import { FC } from 'react';

import { ProductSortModel } from '@entities/product/model/enums';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@primitives/ui/select';
import { useI18n } from '@shared/lib/i18n_client';
import useSetSearchParams from '@shared/lib/useSetSearchParams';

interface Props {
    sort: ProductSortModel | string | undefined
}

const ProductSortList: FC<Props> = ({ sort = ProductSortModel.POPULAR }) => {
    const { dictionary } = useI18n();
    const setSeacrhParams = useSetSearchParams();

    function change(nextSort: string): void {
        setSeacrhParams({ sort: nextSort });
    }

    return (
        <Select
            defaultValue={
                Object.values(ProductSortModel).includes(+sort) ? String(sort) : String(ProductSortModel.POPULAR)
            }
            onValueChange={change}
        >
            <SelectTrigger className='w-auto'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value={String(ProductSortModel.POPULAR)}>{dictionary?.sort.byPopular}</SelectItem>
                    <SelectItem value={String(ProductSortModel.NEW)}>{dictionary?.sort.byNewest}</SelectItem>
                    <SelectItem value={String(ProductSortModel.PRICE_UP)}>{dictionary?.sort.byPriceUp}</SelectItem>
                    <SelectItem value={String(ProductSortModel.PRICE_DOWN)}>{dictionary?.sort.byPriceDown}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ProductSortList;
