'use client';

import { FC, memo, useCallback, useState } from 'react';
import { Heart, Loader } from 'lucide-react';

import { ProductCardModel } from '@entities/product/model/interfaces';
import { useAddProductToWishlist, useRemoveProductFromWishlist } from '../model/hooks';
import { useI18n } from '@shared/lib/i18n_client';
import useAddedToWishlist from '../lib/useAddedToWishlist';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import AppLink from '@shared/ui/AppLink';
import IconButton from '@shared/ui/IconButton';
import { useWishList } from '@entities/wishlist/model/hooks';
import { useToast } from '@primitives/hooks/use-toast';
import { ToastAction } from '@primitives/ui/toast';
import { Tooltip, TooltipWrapper } from '@primitives/ui/tooltip';

interface WishlistItemAddProps {
    productId: ProductCardModel['id']
}

interface WishlistTooltipProps extends Partial<WishlistModel> { }

const WishlistTooltip: FC<WishlistTooltipProps> = memo(
    function Tooltip({ id, title, isDefault }) {
        const { dictionary } = useI18n();

        return (
            <div>
                {dictionary?.wishList.addedToList}&nbsp;
                <AppLink href={`/wishlist/${id}`}>
                    {isDefault ? title || dictionary?.wishList.myList : title}
                </AppLink>
            </div>
        );
    },
    (prev, next) => prev.id === next.id,
);

const WishlistItemAdd: FC<WishlistItemAddProps> = ({ productId }) => {
    const [isHovered, setHovered] = useState<boolean>(false);
    const { toast } = useToast();
    const { dictionary } = useI18n();
    const { data: wishlists } = useWishList();
    const { isFetching, selected, selectedWishlist } = useAddedToWishlist(productId, isHovered);

    const successfullAddCallback = useCallback(() => {
        const defaultWishlist = wishlists.find(({ isDefault }) => isDefault);

        toast({
            description: `${dictionary?.wishList.addedToList} ${defaultWishlist?.title || dictionary?.wishList.myList}`,
            action: wishlists.length > 1
                ? (
                    <ToastAction
                        onClick={() => console.log(111)}
                        altText={dictionary?.common.change as string}
                    >
                        {dictionary?.common.change}
                    </ ToastAction >
                )
                : undefined,
        });
    }, [wishlists]);

    const { mutate: add } = useAddProductToWishlist(productId, successfullAddCallback);
    const { mutate: remove } = useRemoveProductFromWishlist();

    const toogle = useCallback(() => selected ? remove(selected?.id) : add(), [selected]);

    return isFetching
        ? <Loader />
        : (
            <TooltipWrapper
                content={<WishlistTooltip {...selectedWishlist} />}
                isOpen={isHovered}
                handleOpen={setHovered}
                disabled={!Boolean(selected)}
            >
                <IconButton onClick={toogle}>
                    <Heart style={{ color: selected ? 'red' : 'gray' }} />
                </IconButton>
            </TooltipWrapper>
        );
};

export default WishlistItemAdd;
