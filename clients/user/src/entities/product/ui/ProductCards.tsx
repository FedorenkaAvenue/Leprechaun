import { FC, ReactNode } from "react";
import Image from 'next/image';

import { ProductCardModel, ProductPreviewModel } from "../model/interfaces";
import Price from "@shared/ui/Price";
import ProductLabel from "./ProductLabel";
import AppLink from '@shared/ui/AppLink';
import { Card as CardUI, CardContent } from '@primitives/ui/card';

type ProductType = ProductCardModel | ProductPreviewModel

interface CardProps<T> {
    product: T
    renderImages: (product: T) => ReactNode
    renderBottomOptions?: (product: T) => ReactNode
    renderTopOptions?: (product: T) => ReactNode
    renderAdditionalData?: (product: T) => ReactNode
}

const Card = <T extends ProductType>({
    product, renderImages, renderBottomOptions, renderTopOptions, renderAdditionalData,
}: CardProps<T>) => {
    return (
        <CardUI className="w-full h-full">
            <CardContent className="relative">
                <div className='flex justify-between'>
                    <ul className="flex flex-col gap-1">
                        {product.labels.map((i, k) => (
                            <li key={k}><ProductLabel type={i.type} value={i.value} /></li>
                        ))}
                    </ul>
                    {renderTopOptions?.call(null, product)}
                </div>
                <div>
                    <AppLink href={`/product/${product.id}`}>
                        {renderImages(product)}
                    </AppLink>
                </div>
                <div>
                    <div>{product.title}</div>
                    <div className='flex justify-between'>
                        <Price current={product.price.current} old={product.price.old} />
                        <div className='flex gap-2'>
                            {renderBottomOptions?.call(null, product)}
                        </div>
                    </div>
                </div>
                {renderAdditionalData?.call(null, product)}
            </CardContent>
        </CardUI>
    );
};

type ProductCardPreviewProps = Pick<
    CardProps<ProductPreviewModel>,
    'product' | 'renderBottomOptions' | 'renderTopOptions'
>;

export const ProductCardPreview: FC<ProductCardPreviewProps> = props => (
    <Card<ProductPreviewModel>
        renderImages={({ image }) => (
            <Image src={"/" + image} alt="loh" width="180" height="300" />
        )}
        {...props}
    />
);

type ProductCardProps = Pick<
    CardProps<ProductCardModel>,
    'product' | 'renderBottomOptions' | 'renderAdditionalData' | 'renderTopOptions'
>;

export const ProductCard: FC<ProductCardProps> = props => (
    <Card<ProductCardModel>
        renderImages={({ images }) => (
            <Image src={"/" + images[0].src} alt="loh" width="300" height="500" />
        )}
        {...props}
    />
);
