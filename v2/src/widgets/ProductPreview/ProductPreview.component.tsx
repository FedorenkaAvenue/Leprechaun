import Image from 'next/image';

import ProductPreviewSchema from '@schemas/ProductPreview';
import Price from '@components/shared/Price';

import css from './ProductPreview.module.scss';

export default function ProductPreview({ image, title, price }: ProductPreviewSchema) {
    return (
        <div className="grid gap-2 p-3 content h-full">
            <div className={css['img-wrap']}>
                <Image src={`http://media.leprechaun.loc/${image}`} alt={title} width={100} height={300} />
            </div>
            <div>{title}</div>
            <div className="flex">
                <Price {...price} />
            </div>
        </div>
    );
}
