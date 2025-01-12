import { FC, ReactNode } from 'react';
import Image from 'next/image';

import { WishlistModel } from '../model/interfaces';
import { WishlistItemModel } from '../model/interfaces';
import AppLink from '@shared/ui/AppLink';
import { useI18n } from '@shared/lib/i18n_client';
import { Card } from '@primitives/ui/card';

interface Props {
    wishlist: WishlistModel
    renderOption?: (wishlist: WishlistModel) => ReactNode
}

const Item: FC<WishlistItemModel> = ({ product: { image, title } }) => (
    <li className='flex'>
        <Image src={"/" + image} width={80} height={80} alt={title} className='object-contain' />
    </li>
)

const Wishlist: FC<Props> = ({ wishlist, renderOption }) => {
    const { dictionary } = useI18n();
    const { id, isDefault, title, items } = wishlist;

    return (
        <Card className='flex flex-col gap-2'>
            <div className='flex justify-between items-center'>
                <div>
                    <AppLink href={`/wishlist/${id}`}>
                        <div className='font-medium text-base'>
                            {title || dictionary?.wishList.myList}
                            {isDefault && <span className='font-normal text-xs'> ({dictionary?.common.default})</span>}
                        </div>
                    </AppLink>
                    <div className='text-sm'>{items.length > 0 ? `${dictionary?.product.amout}: ${items.length}` : dictionary?.wishList.emptyList}</div>
                </div>
                {renderOption?.call(null, wishlist)}
            </div>
            {items.length > 0 && (
                <AppLink href={`/wishlist/${id}`}>
                    <ul className='flex gap-2'>
                        {items.map(item => <Item key={item.id} {...item} />)}
                    </ul>
                </AppLink>
            )}
        </Card>
    );
};

export default Wishlist;
