'use client'

import { FC, forwardRef, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { Tabs, TabsList, TabsTrigger } from '@primitives/ui/tabs';
import { useI18n } from '@shared/lib/i18n_client';
import { ProductOverviewModel } from '@entities/product/model/interfaces';
import WishlistItemAdd from '@widgets/wishlist/ui/WishlistItemAdd';
import CartAddItem from '@features/order/ui/CartAddItem';
import Price from '@shared/ui/Price';

interface Props {
    product: ProductOverviewModel
}

const Nav = forwardRef<HTMLElement>((_, ref) => {
    const { dictionary } = useI18n();

    return (
        <nav ref={ref}>
            <Tabs defaultValue="allAbout">
                <TabsList className='inline-flex justify-start'>
                    <TabsTrigger value="allAbout">{dictionary?.product.allAbout}</TabsTrigger>
                    <TabsTrigger value="characteristics">{dictionary?.product.characteristics}</TabsTrigger>
                    <TabsTrigger value="description">{dictionary?.product.description}</TabsTrigger>
                </TabsList>
            </Tabs>
        </nav>
    );
})

const TopNavigation: FC<ProductOverviewModel> = ({ id, images, title, price }) => {
    return (
        <div className='fixed top-0 left-0 w-full flex items-center gap-2 p-2 bg-secondary'>
            <Image width={70} height={70} src={images[0].src} alt={title} />
            <div className='flex-1'>
                <div>{title}</div>
                <Nav />
            </div>
            <div className='flex gap-8'>
                <Price price={price} />
                <CartAddItem productId={id} />
                <WishlistItemAdd productId={id} />
            </div>
        </div>
    )
}

const ProductNavigation: FC<Props> = ({ product }) => {
    const ref = useRef<HTMLElement>(null);
    const [isVisible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => setVisible(entries[0].isIntersecting));

        observer.observe(ref.current as HTMLElement);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        }
    }, []);

    return (
        <>
            <Nav ref={ref} />
            {!isVisible && <TopNavigation {...product} />}
        </>
    );
};

export default ProductNavigation;
