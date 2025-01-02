'use client';

import { FC, memo, useCallback, useState } from 'react';
import { Heart, Loader } from 'lucide-react';

import { ProductCardModel } from '@entities/product/model/interfaces';
import { useAddProductToWishlist, useRemoveProductFromWishlist } from '../model/hooks';
import Tooltip from '@shared/ui/Tooltip';
import { useI18n } from '@shared/lib/i18n_client';
import useAddedToWishlist from '../lib/useAddedToWishlist';
import { WishlistModel } from '@entities/wishlist/model/interfaces';
import AppLink from '@shared/ui/AppLink';
import IconButton from '@shared/ui/IconButton';

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
    const { isFetching, selected, selectedWishlist } = useAddedToWishlist(productId, isHovered);
    const { mutate: add } = useAddProductToWishlist(productId);
    const { mutate: remove } = useRemoveProductFromWishlist();

    const toogle = useCallback(() => selected ? remove(selected?.id) : add(), [selected]);

    return isFetching
        ? <Loader />
        : (
            <Tooltip
                content={<WishlistTooltip {...selectedWishlist} />}
                isOpen={isHovered}
                handleOpen={setHovered}
                disabled={!Boolean(selected)}
            >
                <IconButton onClick={toogle}>
                    <Heart style={{ color: selected ? 'red' : 'gray' }} />
                </IconButton>
            </Tooltip>
        );
};

export default WishlistItemAdd;
