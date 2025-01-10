import { FC } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';
import IconButton from '@shared/ui/IconButton';
import { useRemoveWishlist, useUpdateWishlist } from '../model/hooks';
import WishlistCU from './WishlistCU';
import useAddWishlistItemsToCart from '../lib/useAddWishlistItemsToCart';
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuItemWishDialog, DropdownMenuTrigger,
} from '@primitives/ui/dropdown-menu';

interface Props {
    wishlist: WishlistModel
}

const WishlistOptions: FC<Props> = ({ wishlist }) => {
    const { dictionary } = useI18n();
    const { mutate: remove } = useRemoveWishlist(wishlist.id);
    const { mutate: update } = useUpdateWishlist(wishlist.id);
    const { addWishlistItemsToCart, isDisableToAdd } = useAddWishlistItemsToCart(wishlist.id);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <IconButton><EllipsisVertical /></IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuItemWishDialog
                    dialog={
                        <WishlistCU
                            handleSubmit={update}
                            initForm={wishlist}
                            trans={{
                                title: dictionary?.wishList.editWishlist,
                                submitButton: dictionary?.common.save,
                            }}
                        />
                    }
                >
                    {dictionary?.common.edit}
                </DropdownMenuItemWishDialog>
                {!isDisableToAdd && (
                    <DropdownMenuItem onClick={addWishlistItemsToCart}>
                        {dictionary?.wishList.buyAllItems}
                    </DropdownMenuItem>
                )}
                {!wishlist?.isDefault && (
                    <>
                        <DropdownMenuItem onClick={() => update({ isDefault: true })}>
                            {dictionary?.wishList.makeListAsDefault}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => remove()}>
                            {dictionary?.common.remove}
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default WishlistOptions;
