'use client';

import { FC, memo, useCallback, useState } from 'react';
import { Heart, Loader } from 'lucide-react';

import { useI18n } from '@shared/lib/i18n_client';
import AppLink from '@shared/ui/AppLink';
import IconButton from '@shared/ui/IconButton';
import { useWishlists } from '@entities/wishlist/model/hooks';
import { useToast } from '@primitives/hooks/use-toast';
import { ToastAction } from '@primitives/ui/toast';
import { TooltipWrapper } from '@primitives/ui/tooltip';
import useAddedToWishlist from '@features/wishlist/lib/useAddedToWishlist';
import { useAddWishlistItem, useRemoveWishlistItem } from '@features/wishlist/model/hooks';
import WishlistItemChangeList from '@features/wishlist/ui/WishlistItemChangeList';
import { twConfig } from '@root/tailwind.config';
import { Dialog, DialogContent } from '@primitives/ui/dialog';
import { ProductCardPublic } from '@gen/product';
import { WishlistPublic } from '@gen/wishlist';

interface WishlistItemAddProps {
    productId: ProductCardPublic['id']
}

interface WishlistTooltipProps extends Partial<WishlistPublic> { }

const WishlistTooltip: FC<WishlistTooltipProps> = memo(
    function Tooltip({ id, title }) {
        const { dictionary } = useI18n();

        return (
            <div>
                {dictionary?.wishList.addedToList}&nbsp;
                <AppLink href={`/profile/wishlist/${id}`} withAction>
                    {title || dictionary?.wishList.myList}
                </AppLink>
            </div>
        );
    },
    (prev, next) => prev.id === next.id,
);

const WishlistItemAdd: FC<WishlistItemAddProps> = ({ productId }) => {
    const [isChangeWishlistOpen, setChangeWishlistOpen] = useState(false);
    const [isHovered, setHovered] = useState<boolean>(false);
    const { toast } = useToast();
    const { dictionary } = useI18n();
    const { data: wishlists } = useWishlists();
    const { isFetching, selected, selectedWishlist } = useAddedToWishlist(productId, isHovered);
    const { mutate: remove } = useRemoveWishlistItem();

    const successfullAddCallback = useCallback(() => {
        const defaultWishlist = wishlists.find(({ isDefault }) => isDefault);

        toast({
            description: (
                <div>
                    {dictionary?.wishList.addedToList}
                    <span>&#32;</span>
                    <AppLink href={`/profile/wishlist/${defaultWishlist?.id}`} withAction>
                        {defaultWishlist?.title || dictionary?.wishList.myList}
                    </AppLink>
                </div>
            ),
            action: wishlists.length > 1
                ? (
                    <ToastAction
                        onClick={() => setChangeWishlistOpen(true)}
                        altText={dictionary?.common.change as string}
                    >
                        {dictionary?.common.change}
                    </ ToastAction >
                )
                : undefined,
        });
    }, [wishlists]);

    const toogle = useCallback(() => selected ? remove(selected?.id) : add(), [selected]);

    const { mutate: add } = useAddWishlistItem(productId, successfullAddCallback);

    return (
        <>
            <Dialog open={isChangeWishlistOpen} onOpenChange={setChangeWishlistOpen}>
                <DialogContent>
                    <WishlistItemChangeList handleOpenChange={setChangeWishlistOpen} wishlistItemId={selected?.id} />
                </DialogContent>
            </Dialog>
            {
                isFetching
                    ? <Loader />
                    : (
                        <TooltipWrapper
                            content={<WishlistTooltip {...selectedWishlist} />}
                            isOpen={isHovered}
                            handleOpen={setHovered}
                            disabled={!Boolean(selected)}
                        >
                            <IconButton onClick={toogle} customIcon>
                                <Heart style={{ color: selected && twConfig.theme.colors.achtung }} />
                            </IconButton>
                        </TooltipWrapper>
                    )
            }
        </>
    );
};

export default WishlistItemAdd;
