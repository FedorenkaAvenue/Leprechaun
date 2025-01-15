import { FC, ReactNode } from 'react';
import Image from 'next/image';

import { ProductCardModel, ProductPreviewModel } from '../model/interfaces';
import Price, { Props as PriceProps } from '@shared/ui/Price';
import ProductLabel from './ProductLabel';
import AppLink from '@shared/ui/AppLink';
import { Card as CardUI, CardContent, CardProps as CardUIProps } from '@primitives/ui/card';
import { Skeleton } from '@primitives/ui/skeleton';

type ProductType = ProductCardModel | ProductPreviewModel

interface CardProps<T> {
    product: T
    renderImages: (product: T) => ReactNode
    renderBottomOptions?: (product: T) => ReactNode
    renderTopOptions?: (product: T) => ReactNode
    renderAdditionalData?: (product: T) => ReactNode
    ui?: {
        card?: CardUIProps
        price?: Partial<PriceProps>
    }
}

type ProductCardPreviewProps = Pick<
    CardProps<ProductPreviewModel>,
    'product' | 'renderBottomOptions' | 'renderTopOptions'
>;

type ProductCardProps = Pick<
    CardProps<ProductCardModel>,
    'product' | 'renderBottomOptions' | 'renderAdditionalData' | 'renderTopOptions'
>;

const Card = <T extends ProductType>({
    product, renderImages, renderBottomOptions, renderTopOptions, renderAdditionalData, ui,
}: CardProps<T>) => {
    return (
        <CardUI element='article' className='w-full h-full' {...ui?.card}>
            <CardContent className='relative flex flex-col h-full'>
                <div className='flex-grow mb-2'>
                    <div className='absolute flex justify-between w-full'>
                        <ul className='flex flex-col items-start gap-1'>
                            {product.labels.map((i, k) => (
                                <li key={k}><ProductLabel type={i.type} value={i.value} /></li>
                            ))}
                        </ul>
                        {renderTopOptions?.call(null, product)}
                    </div>
                    <div className='h-full flex items-center'>
                        <AppLink href={`/product/${product.id}`}>
                            {renderImages(product)}
                        </AppLink>
                    </div>
                </div>
                <div>
                    <h6>{product.title}</h6>
                    <div className='flex justify-between items-end'>
                        <Price price={product.price} {...ui?.price} />
                        <div className='flex gap-2 relative bottom-1'>
                            {renderBottomOptions?.call(null, product)}
                        </div>
                    </div>
                </div>
                {renderAdditionalData?.call(null, product)}
            </CardContent>
        </CardUI>
    );
};

export const ProductCardPreview: FC<ProductCardPreviewProps> = props => (
    <Card<ProductPreviewModel>
        renderImages={({ image }) => (
            <Image
                src={'/' + image}
                alt={props.product.title}
                width={160} height={160}
            />
        )}
        ui={{
            card: { size: 'tiny', className: 'max-w-[180px] h-full' },
            price: { size: 'small' },
        }}
        {...props}
    />
);

export const ProductCardPreviewSkeleton: FC = () => (
    <Skeleton className='flex flex-col gap-2 w-44 h-64 p-2' type='card'>
        <Skeleton className='h-40' />
        <Skeleton className='h-4' />
        <Skeleton className='flex-grow h-8' />
    </Skeleton>
);

export const ProductCard: FC<ProductCardProps> = props => (
    <Card<ProductCardModel>
        renderImages={({ images }) => (
            <Image
                src={'/' + images[0].src}
                alt={props.product.title}
                width='300'
                height='300'
            />
        )}
        {...props}
    />
);

export const ProductCardSkeleton: FC = () => (
    <Skeleton className='flex flex-col gap-2 w-44 h-64 p-2' type='card'>
        <Skeleton className='h-40' />
        <Skeleton className='h-4' />
        <Skeleton className='flex-grow h-8' />
    </Skeleton>
);
