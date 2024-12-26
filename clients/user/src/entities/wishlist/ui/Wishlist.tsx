import { FC, ReactNode } from 'react';
import Image from 'next/image';

import { WishlistModel } from '../model/interfaces';
import { WishlistItemModel } from '../model/interfaces';
import AppLink from '@shared/ui/AppLink';
import { useI18n } from '@shared/lib/i18n_client';

interface Props {
    wishlist: WishlistModel
    renderOption?: (wishlist: WishlistModel) => ReactNode
}

const Item: FC<WishlistItemModel> = ({ product: { image, title } }) => (
    <li>
        <Image src={"/" + image} width={100} height={100} alt={title} />
    </li>
)

const Wishlist: FC<Props> = ({ wishlist, renderOption }) => {
    const { dictionary } = useI18n();
    const { id, isDefault, title, items } = wishlist;

    return (
        <div className='flex flex-col gap-2 p-2'>
            <div className='flex justify-between items-center'>
                <div>
                    <AppLink href={`/wishlist/${id}`}>
                        <h2>{title || dictionary?.wishList.myList} {isDefault && `(${dictionary?.common.default})`}</h2>
                    </AppLink>
                    <div>{items.length > 0 ? `${dictionary?.product.amout}: ${items.length}` : dictionary?.wishList.emptyList}</div>
                </div>
                {renderOption?.call(null, wishlist)}
            </div>
            <AppLink href={`/wishlist/${id}`}>
                <ul className='flex gap-2'>
                    {items.map(item => <Item key={item.id} {...item} />)}
                </ul>
            </AppLink>
        </div>
    );
};

export default Wishlist;
