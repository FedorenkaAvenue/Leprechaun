import { FC, useState } from 'react';
import { EllipsisVertical } from 'lucide-react';

import { WishlistModel } from '@entities/wishlist/model/interfaces';
import { useI18n } from '@shared/lib/i18n_client';
import IconButton from '@shared/ui/IconButton';
import { useRemoveWishlist, useUpdateWishlist } from '../model/hooks';
import WishlistCU from './WishlistCU';
import useAddWishlistItemsToCart from '../lib/useAddWishlistItemsToCart';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@primitives/ui/dropdown-menu';
import { Dialog, DialogContent } from '@primitives/ui/dialog';
import { CreateWishlistDTO } from '../api/dto';

interface Props {
    wishlist: WishlistModel
}

const WishlistOptions: FC<Props> = ({ wishlist }) => {
    const { dictionary } = useI18n();
    const [isEditOpen, setEditOpen] = useState(false);
    const { mutate: remove } = useRemoveWishlist(wishlist.id);
    const { mutate: update } = useUpdateWishlist(wishlist.id);
    const { addWishlistItemsToCart, isDisableToAdd } = useAddWishlistItemsToCart(wishlist.id);

    function onUpdate(data: CreateWishlistDTO) {
        update(data);
        setEditOpen(false);
    }

    return (
        <Dialog open={isEditOpen} onOpenChange={setEditOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <IconButton><EllipsisVertical /></IconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuItem onSelect={() => setEditOpen(true)}>
                        {dictionary?.common.edit}
                    </DropdownMenuItem>
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
            <DialogContent>
                <WishlistCU
                    handleSubmit={onUpdate}
                    initForm={wishlist}
                    trans={{
                        title: dictionary?.wishList.editWishlist,
                        submitButton: dictionary?.common.save,
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default WishlistOptions;
