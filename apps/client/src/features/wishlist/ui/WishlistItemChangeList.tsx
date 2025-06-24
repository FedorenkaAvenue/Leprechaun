import { FC, useCallback, useMemo, useState } from 'react';

import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@primitives/ui/dialog';
import { Button } from '@primitives/ui/button';
import { useI18n } from '@shared/lib/i18n_client';
import { RadioGroup, RadioGroupItem } from '@primitives/ui/radio-group';
import { Label } from '@primitives/ui/label';
import { useWishlists } from '@entities/wishlist/model/hooks';
import { useMoveWishlistItem } from '../model/hooks';
import { WishlistPublic } from '@gen/wishlist';

interface Props {
    wishlistItemId: WishlistPublic['id'] | undefined
    handleOpenChange: (state: boolean) => void
}

const WishlistItemChangeList: FC<Props> = ({ wishlistItemId, handleOpenChange }) => {
    const [selected, setSelected] = useState<WishlistPublic['id']>();
    const { dictionary } = useI18n();
    const { data: wishlists } = useWishlists();
    const currentWishlist = useMemo(
        () => wishlists.find(({ items }) => items.find(({ id }) => id === wishlistItemId)),
        [wishlists],
    );
    const { mutate: moveItem } = useMoveWishlistItem();

    const submit = useCallback(() => {
        if (wishlistItemId && selected && selected !== currentWishlist?.id) {
            moveItem({ wishlistId: selected, itemId: wishlistItemId });
        }

        handleOpenChange(false);
    }, [selected, currentWishlist]);

    return (
        <>
            <DialogHeader>
                <DialogTitle>{dictionary?.wishList.moveItemsToAnotherList}</DialogTitle>
            </DialogHeader>
            <RadioGroup defaultValue={currentWishlist?.id} onValueChange={setSelected}>
                {wishlists.map(({ id, title }) => (
                    <div key={id} className='flex items-center space-x-2'>
                        <RadioGroupItem value={id} id={id} />
                        <Label htmlFor={id}>{title || dictionary?.wishList.myList}</Label>
                    </div>
                ))}
            </RadioGroup>
            <DialogFooter>
                <DialogClose>{dictionary?.common.cancel}</DialogClose>
                <Button onClick={submit}>{dictionary?.common.save}</Button>
            </DialogFooter>
        </>
    );
};

export default WishlistItemChangeList;
