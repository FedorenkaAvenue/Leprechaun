import { FC, useMemo, useState } from 'react';

import { Dialog, DialogClose, DialogContent, DialogFooter } from '@primitives/ui/dialog';
import { Button } from '@primitives/ui/button';
import { useI18n } from '@shared/lib/i18n_client';
import { RadioGroup, RadioGroupItem } from '@primitives/ui/radio-group';
import { Label } from '@primitives/ui/label';
import { useWishlists } from '@entities/wishlist/model/hooks';
import { WishlistModel } from '@entities/wishlist/model/interfaces';

interface Props {
    isOpen?: boolean
    handleSubmit: (wishlistId: WishlistModel['id']) => void
    handleOpenChange: (state: boolean) => void
}

const WishlistItemChangeList: FC<Props> = ({ isOpen, handleSubmit, handleOpenChange }) => {
    const [selected, setSelected] = useState<WishlistModel['id']>();
    const { dictionary } = useI18n();
    const { data: wishlists } = useWishlists();
    const currentWishlist = useMemo(() => wishlists.find(({ isDefault }) => isDefault), [wishlists]);

    function submit(): void {
        if (selected && selected !== currentWishlist?.id) handleSubmit(selected);

        handleOpenChange(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent>
                <RadioGroup defaultValue={currentWishlist?.id} onValueChange={setSelected}>
                    {wishlists.map(({ id, title }) => (
                        <div key={id} className="flex items-center space-x-2">
                            <RadioGroupItem value={id} id={id} />
                            <Label htmlFor={id}>{title}</Label>
                        </div>
                    ))}
                </RadioGroup>
                <DialogFooter>
                    <DialogClose>{dictionary?.common.cancel}</DialogClose>
                    <Button onClick={submit}>{dictionary?.common.save}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default WishlistItemChangeList;
