import { FC, ReactNode } from 'react';
import Image from 'next/image';

import { WishlistModel } from '../model/interfaces';
import { WishlistItemModel } from '../model/interfaces';
import AppLink from '@shared/ui/AppLink';
import { useI18n } from '@shared/lib/i18n_client';
import { Card } from '@primitives/ui/card';
import { Skeleton } from '@primitives/ui/skeleton';
import Grid from '@shared/ui/Grid';

interface Props {
    wishlist: WishlistModel
    renderOption?: (wishlist: WishlistModel) => ReactNode
}

const Item: FC<WishlistItemModel> = ({ product: { image, title } }) => (
    <li className='flex'>
        <Image src={'/' + image} width={80} height={80} alt={title} className='object-contain' />
    </li>
)

const Wishlist: FC<Props> = ({ wishlist, renderOption }) => {
    const { dictionary } = useI18n();
    const { id, isDefault, title, items } = wishlist;

    return (
        <Card element='article' className='flex flex-col gap-2 h-full'>
            <div className='flex justify-between items-center gap-7'>
                <div>
                    <AppLink href={`/profile/wishlist/${id}`}>
                        <div className='font-medium text-base'>
                            <h2 className='inline-block'>{title || dictionary?.wishList.myList}</h2>
                            {isDefault && <span className='font-normal text-xs'> ({dictionary?.common.default})</span>}
                        </div>
                    </AppLink>
                    <div className='text-sm'>{items.length > 0 ? `${dictionary?.product.amout}: ${items.length}` : dictionary?.wishList.emptyList}</div>
                </div>
                {renderOption?.call(null, wishlist)}
            </div>
            {items.length > 0 && (
                <AppLink href={`/profile/wishlist/${id}`}>
                    <Grid size='s'>
                        {items.map(item => <Item key={item.id} {...item} />)}
                    </Grid>
                </AppLink>
            )}
        </Card>
    );
};

export const WishlistSkeleton: FC = () => (
    <Skeleton className='h-44 w-full p-4 flex flex-col items-start gap-2' type='card'>
        <Skeleton className='h-8 w-52 inline-block' />
        <Skeleton className='h-8 w-40 inline-block' />
        <Skeleton className='h-full w-full' />
    </Skeleton>
)

export default Wishlist;
