import { FC } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { WishlistItemModel } from '@entities/wishlist/model/interfaces';
import IconButton from '@shared/ui/IconButton';
import { useI18n } from '@shared/lib/i18n_client';
import { useRemoveWishlistItem } from '../model/hooks';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@primitives/ui/dropdown-menu';

interface Props {
    itemId: WishlistItemModel['id']
}

const WishlistItemOptions: FC<Props> = ({ itemId }) => {
    const { dictionary } = useI18n();
    const { mutate: remove } = useRemoveWishlistItem();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IconButton><EllipsisVertical /></IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => remove(itemId)}>
                    {dictionary?.common.remove}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default WishlistItemOptions;
