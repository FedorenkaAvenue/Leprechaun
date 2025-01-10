import { FC } from 'react';

import { WishlistItemsSort } from '@entities/wishlist/model/enums';
import { useI18n } from '@shared/lib/i18n_client';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@primitives/ui/select';

interface Props {
    value: WishlistItemsSort
    handleChange: (sort: WishlistItemsSort) => void
}

const WishlistSortList: FC<Props> = ({ value, handleChange }) => {
    const { dictionary } = useI18n();

    return (
        <Select defaultValue={value} onValueChange={handleChange}>
            <SelectTrigger className='w-auto'>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value={WishlistItemsSort.LASTEST}>{dictionary?.sort.byDate}</SelectItem>
                    <SelectItem value={WishlistItemsSort.PRICE_UP}>{dictionary?.sort.byPriceUp}</SelectItem>
                    <SelectItem value={WishlistItemsSort.PRICE_DOWN}>{dictionary?.sort.byPriceDown}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default WishlistSortList;
