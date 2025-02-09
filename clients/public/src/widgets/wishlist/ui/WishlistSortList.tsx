import { FC, useCallback } from 'react';

import { WishlistItemsSort } from '@entities/wishlist/model/enums';
import { useI18n } from '@shared/lib/i18n_client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@primitives/ui/select';

interface Props {
    value: WishlistItemsSort
    handleChange: (sort: WishlistItemsSort) => void
}

const WishlistSortList: FC<Props> = ({ value, handleChange }) => {
    const { dictionary } = useI18n();

    const change = useCallback((val: string) => {
        handleChange(+val);
    }, []);

    return (
        <Select defaultValue={String(value)} onValueChange={change}>
            <SelectTrigger className='w-auto'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value={String(WishlistItemsSort.LASTEST)}>{dictionary?.sort.byDate}</SelectItem>
                    <SelectItem value={String(WishlistItemsSort.PRICE_UP)}>{dictionary?.sort.byPriceUp}</SelectItem>
                    <SelectItem value={String(WishlistItemsSort.PRICE_DOWN)}>{dictionary?.sort.byPriceDown}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default WishlistSortList;
