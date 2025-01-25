'use client';

import { FC, useState } from 'react';
import Image from 'next/image';

import { ImageModel } from '@shared/models/Image';
import { cn } from '@primitives/lib/utils';
import { ProductCardModel } from '@entities/product/model/interfaces';

interface Props {
    images: ImageModel[]
    imageTitle: ProductCardModel['title']
    imageSize: number
}

interface CurtainProps {
    isActive: boolean
    handleMouseOver: () => void
}

const Curtain: FC<CurtainProps> = ({ isActive, handleMouseOver }) => (
    <li
        onMouseOver={handleMouseOver}
        className={cn(
            'flex-1 border-b-2 border-muted-primary transition-all',
            isActive && 'border-secondary-foreground'
        )}
    />
)

const ImageSlider = ({ images, imageTitle, imageSize }: Props) => {
    if (!images.length) return (
        <Image
            src='/static/no_image.png'
            width={imageSize} height={imageSize}
            alt={imageTitle}
        />
    );

    const [postition, setPostition] = useState<number>(0);

    return (
        <div className='relative flex justify-center min-h-52' onMouseLeave={() => setPostition(0)}>
            <Image
                src={'/' + images[postition].src}
                alt={imageTitle}
                width={imageSize} height={imageSize}
                className='object-contain'
            />
            <ul className='absolute top-0 w-full h-full flex'>
                {
                    images.map((_, i) => (
                        <Curtain
                            key={i}
                            isActive={postition === i}
                            handleMouseOver={() => setPostition(i)}
                        />)
                    )
                }
            </ul>
        </div>
    );
};

export default ImageSlider;
