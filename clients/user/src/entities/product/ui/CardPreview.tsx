import Image from "next/image";
import NextLink from 'next/link';
import { ReactNode } from "react";

import { ProductPreviewModel } from "../models/Product";
import { Card, CardContent } from "@shared/ui/card";
import Price from "@shared/ui/price";
import Label from "./Label";

interface Props {
    product: ProductPreviewModel
    renderTools?: (product: ProductPreviewModel) => ReactNode
}

const ProductCardPreview = ({ product, renderTools }: Props) => {
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
                    <NextLink href={`product/${product.id}`}>
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

export default ProductCardPreview;
