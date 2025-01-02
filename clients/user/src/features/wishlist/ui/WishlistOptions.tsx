import { FC } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';
import IconButton from '@shared/ui/IconButton';
import Dropdown from '@shared/ui/DropdownMenu';
import { useRemoveWishlist, useUpdateWishlist } from '../model/hooks';
import WishlistCU from './WishlistCU';
import useAddWishlistItemsToCart from '../lib/useAddWishlistItemsToCart';

interface Props {
    wishlist: WishlistModel
}

const WishlistOptions: FC<Props> = ({ wishlist }) => {
    const { dictionary } = useI18n();
    const { mutate: remove } = useRemoveWishlist(wishlist.id);
    const { mutate: update } = useUpdateWishlist(wishlist.id);
    const { addWishlistItemsToCart, isDisableToAdd } = useAddWishlistItemsToCart(wishlist.id);

    return (
        <Dropdown.Menu>
            <Dropdown.MenuTrigger asChild>
                <IconButton><EllipsisVertical /></IconButton>
            </Dropdown.MenuTrigger>
            <Dropdown.MenuContent className="w-56">
                <Dropdown.MenuItemWishDialog
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
                </Dropdown.MenuItemWishDialog>
                {!isDisableToAdd && (
                    <Dropdown.MenuItem onClick={addWishlistItemsToCart}>
                        {dictionary?.wishList.buyAllItems}
                    </Dropdown.MenuItem>
                )}
                {!wishlist?.isDefault && (
                    <>
                        <Dropdown.MenuItem onClick={() => update({ isDefault: true })}>
                            {dictionary?.wishList.makeListAsDefault}
                        </Dropdown.MenuItem>
                        <Dropdown.MenuItem onClick={() => remove()}>
                            {dictionary?.common.remove}
                        </Dropdown.MenuItem>
                    </>
                )}
            </Dropdown.MenuContent>
        </Dropdown.Menu>
    );
};

export default WishlistOptions;
