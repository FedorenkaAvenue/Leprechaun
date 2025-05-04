import { FC, ReactNode } from 'react';
import Image from 'next/image';

import { ProductCardModel, ProductPreviewModel } from '../model/interfaces';
import Price, { Props as PriceProps } from '@shared/ui/Price';
import ProductLabel from './ProductLabel';
import AppLink from '@shared/ui/AppLink';
import { CardContent, Card as CardUI, CardProps as CardUIProps } from '@primitives/ui/card';
import { Skeleton } from '@primitives/ui/skeleton';
import { cn } from '@primitives/lib/utils';
import Grid from '@shared/ui/Grid';
import { ProductStatusModel } from '../model/enums';
import ProductStatus from './ProductStatus';
import ImageSlider from '@shared/ui/ImageSlider';

type ProductType = ProductCardModel | ProductPreviewModel

interface CardProps<T> {
    product: T
    renderImages: (product: T) => ReactNode
    renderBottomOptions?: (product: T) => ReactNode // right to price
    renderTopOptions?: (product: T) => ReactNode
    renderAdditionalData?: (product: T) => ReactNode // bottom on card hover
    renderStatus?: (status: ProductStatusModel) => ReactNode
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
    product, renderImages, renderBottomOptions, renderTopOptions, renderAdditionalData, renderStatus, ui,
}: CardProps<T>) => {
    const { labels, id, title, price, status } = product;
    const isAvailable = status === ProductStatusModel.AVAILABLE;

    return (
        <CardUI
            element='article'
            {...ui?.card}
            className={cn('group/additional relative w-full h-full', ui?.card?.className)}
        >
            <CardContent className='h-full'>
                <div className='flex flex-col h-full'>
                    <div className='flex-grow mb-2 relative'>
                        <div className='z-10 absolute pointer-events-none w-full'>
                            {labels.length > 0 && (
                                <Grid gap='s' className={cn(!isAvailable && 'opacity-60')}>
                                    {labels.map((label, i) => (
                                        <li key={i} className='flex'>
                                            <ProductLabel type={label.type} value={label.value} />
                                        </li>
                                    ))}
                                </Grid>
                            )}
                            {renderTopOptions && (
                                <div className='absolute right-0 top-0 pointer-events-auto'>
                                    {renderTopOptions.call(null, product)}
                                </div>
                            )}
                        </div>
                        <div className={cn('h-full flex items-center', !isAvailable && 'opacity-35')}>
                            <AppLink href={`/product/${id}`} className='w-full'>
                                {renderImages(product)}
                            </AppLink>
                        </div>
                    </div>
                    <div>
                        <h6 className={cn(!isAvailable && 'opacity-35')}>{title}</h6>
                        {renderStatus?.call(null, status)}
                        <div className='flex justify-between items-end'>
                            <Price
                                price={price}
                                {...ui?.price}
                                classNames={ui?.price?.classNames}
                                isUnavailable={!isAvailable}
                            />
                            <div className='flex gap-2 relative bottom-1'>
                                {renderBottomOptions?.call(null, product)}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    renderAdditionalData
                    && (
                        <CardUI className='absolute hidden text-sm group-hover/additional:block left-0 w-full pt-2'>
                            {renderAdditionalData(product)}
                        </CardUI>
                    )
                }
            </CardContent>
        </CardUI>
    );
};

export const ProductCardPreview: FC<ProductCardPreviewProps> = props => (
    <Card<ProductPreviewModel>
        renderImages={({ image, title }) => (
            <Image
                src={image}
                alt={title}
                width={160} height={160}
            />
        )}
        ui={{
            card: { size: 'tiny', className: 'min-w-[180px]' },
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
        renderImages={({ images, title }) => (
            <ImageSlider images={images} imageTitle={title} imageSize={300} />
        )}
        renderStatus={status => <ProductStatus status={status} />}
        {...props}
    />
);

export const ProductCardSkeleton: FC = () => (
    <Skeleton className='flex flex-col gap-2 h-64 p-2' type='card'>
        <Skeleton className='h-40' />
        <Skeleton className='h-4' />
        <Skeleton className='flex-grow h-8' />
    </Skeleton>
);
