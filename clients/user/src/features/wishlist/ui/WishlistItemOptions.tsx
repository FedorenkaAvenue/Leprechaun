import { FC } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import Dropdown from '@shared/ui/DropdownMenu';
import IconButton from '@shared/ui/IconButton';
import { useI18n } from '@shared/lib/i18n_client';
import { useRemoveProductFromWishlist } from '../model/hooks';

interface Props {
    itemId: WishlistItemModel['id']
}

const WishlistItemOptions: FC<Props> = ({ itemId }) => {
    const { dictionary } = useI18n();
    const { mutate: remove } = useRemoveProductFromWishlist();

    return (
        <Dropdown.Menu>
            <Dropdown.MenuTrigger asChild>
                <IconButton><EllipsisVertical /></IconButton>
            </Dropdown.MenuTrigger>
            <Dropdown.MenuContent className="w-56">
                <Dropdown.MenuItem onClick={() => remove(itemId)}>
                    {dictionary?.common.remove}
                </Dropdown.MenuItem>
            </Dropdown.MenuContent>
        </Dropdown.Menu>
    );
};

export default WishlistItemOptions;
