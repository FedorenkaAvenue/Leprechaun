import { FC } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';
import IconButton from '@shared/ui/IconButton';
import { useRemoveWishlist, useUpdateWishlist } from '@features/wishlist/model/hooks';
import WishlistCU from '@features/wishlist/ui/WishlistCU';
import Dropdown from '@shared/ui/DropdownMenu';

interface Props {
    wishlist: WishlistModel
}

const WishlistOptions: FC<Props> = ({ wishlist }) => {
    const { id, isDefault } = wishlist;
    const { dictionary } = useI18n();
    const { mutate: remove } = useRemoveWishlist(id);
    const { mutate: update } = useUpdateWishlist(id);

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
                {!isDefault && (
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
