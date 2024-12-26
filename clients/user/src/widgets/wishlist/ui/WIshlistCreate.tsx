import { FC, useState } from 'react';
import { CirclePlus } from 'lucide-react';

import { useCreateWishlist } from '@features/wishlist/model/hooks';
import WishlistCU from '@features/wishlist/ui/WishlistCU';
import Dialog from '@shared/ui/Dialog';
import { CreateWishlistDTO } from '@features/wishlist/api/dto';
import { useI18n } from '@shared/lib/i18n_client';

const WishlistCreate: FC = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { mutate } = useCreateWishlist();
    const { dictionary } = useI18n();

    function submit(updates: CreateWishlistDTO) {
        mutate(updates);
        setOpen(false);
    }

    return (
        <Dialog.Root open={isOpen} onOpenChange={setOpen}>
            <Dialog.Trigger>
                <CirclePlus />
            </Dialog.Trigger>
            <WishlistCU
                handleSubmit={submit}
                trans={{
                    title: dictionary?.wishList.createNewList,
                    submitButton: dictionary?.common.create,
                }}
            />
        </Dialog.Root>
    );
};

export default WishlistCreate;
