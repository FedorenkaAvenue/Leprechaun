import { FC, ReactNode } from 'react';
import NextLink from 'next/link';
import Image from "next/image";

import { ProductPreviewModel } from '../models/Product';
import { Card, CardContent } from '@shared/ui/card';
import Label from './Label';
import Price from '@shared/ui/price';

interface Props {
    product: ProductPreviewModel
    renderTools?: (product: ProductPreviewModel) => ReactNode
}

const ProductPreview: FC<Props> = ({ product, renderTools }) => {
    return (
        <Card className="w-full h-full">
            <CardContent className="relative">
                <div>
                    <ul className="flex flex-col gap-1">
                        {product.labels.map((i, k) => (
                            <li key={k}><Label type={i.type} value={i.value} /></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <NextLink href=''>
                        <Image src={"/" + product.image} alt="loh" width="300" height="500" />
                    </NextLink>
                </div>
                <div>
                    <div>{product.title}</div>
                    <Price current={product.price.current} old={product.price.old} />
                    {renderTools?.call(null, product)}
                </div>
            </CardContent>
        </Card>
    );
};

export default ProductPreview;
