import { FC } from 'react';
import { Trash } from 'lucide-react';
import { useRemoveProductToFavorite } from '../api/hooks';
import { WishListItemModel } from '@entities/wishlist/models/WishList';

interface Props {
    itemId: WishListItemModel['id']
}

const ProductRemoveFromFavorite: FC<Props> = ({ itemId }) => {
    const { mutate } = useRemoveProductToFavorite(itemId);

    return <Trash onClick={() => mutate()} />;
};

export default ProductRemoveFromFavorite;
