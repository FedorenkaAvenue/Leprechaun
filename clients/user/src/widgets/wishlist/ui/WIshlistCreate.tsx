'use client';

import { FC, useState } from 'react';
import { CirclePlus } from 'lucide-react';

import { useCreateWishlist } from '@features/wishlist/model/hooks';
import WishlistCU from '@features/wishlist/ui/WishlistCU';
import { CreateWishlistDTO } from '@features/wishlist/api/dto';
import { useI18n } from '@shared/lib/i18n_client';
import { Dialog, DialogContent, DialogTrigger } from '@primitives/ui/dialog';

const WishlistCreate: FC = () => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const { mutate } = useCreateWishlist();
    const { dictionary } = useI18n();

    function submit(updates: CreateWishlistDTO) {
        mutate(updates);
        setOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setOpen}>
            <DialogTrigger className='button-with-svg'>
                <CirclePlus />
            </DialogTrigger>
            <DialogContent>
                <WishlistCU
                    handleSubmit={submit}
                    trans={{
                        title: dictionary?.wishList.createNewList,
                        submitButton: dictionary?.common.create,
                    }}
                />
            </DialogContent>
        </Dialog>
    );
};

export default WishlistCreate;
