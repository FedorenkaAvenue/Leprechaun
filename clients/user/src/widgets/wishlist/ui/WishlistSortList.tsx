import { FC } from 'react';

import Select from "@shared/ui/Select";
import { WishlistItemsSort } from '@entities/wishlist/model/enums';
import { useI18n } from '@shared/lib/i18n_client';

interface Props {
    value: WishlistItemsSort
    handleChange: (sort: WishlistItemsSort) => void
}

const WishlistSortList: FC<Props> = ({ value, handleChange }) => {
    const { dictionary } = useI18n();

    return (
        <Select.Root defaultValue={value} onValueChange={handleChange}>
            <Select.Trigger className='w-auto'>
                <Select.Value />
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    <Select.Item value={WishlistItemsSort.LASTEST}>{dictionary?.sort.byDate}</Select.Item>
                    <Select.Item value={WishlistItemsSort.PRICE_UP}>{dictionary?.sort.byPriceUp}</Select.Item>
                    <Select.Item value={WishlistItemsSort.PRICE_DOWN}>{dictionary?.sort.byPriceDown}</Select.Item>
                </Select.Group>
            </Select.Content>
        </Select.Root>
    );
};

export default WishlistSortList;
