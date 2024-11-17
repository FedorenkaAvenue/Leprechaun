import Image from "next/image";
import NextLink from 'next/link';
import { ReactNode } from "react";

import { ProductCardModel } from "../models/Product";
import { Card, CardContent } from "@shared/ui/card";
import Price from "@shared/ui/price";
import AppLink from "@shared/ui/link";
import Label from "./Label";

interface Props {
    product: ProductCardModel
    renderTools?: (product: ProductCardModel) => ReactNode
}

const ProductCard = ({ product, renderTools }: Props) => {
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
                        <Image src={"/" + product.images[0]?.src} alt="loh" width="300" height="500" />
                    </NextLink>
                </div>
                <div>
                    <div>{product.title}</div>
                    <div>{product.description}</div>
                    <Price current={product.price.current} old={product.price.old} />
                    {renderTools?.call(null, product)}
                </div>
                {
                    !!product.options.length && (
                        <div className="text-sm">
                            {product.options.map(o => (
                                <div key={o.id}>
                                    <span className="text-secondary-foreground">{o.title}</span>:&nbsp;
                                    {o.properties.map(p => (
                                        <span key={p.id}><AppLink href=''>{p.title}</AppLink></span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )
                }
            </CardContent>
        </Card>
    );
};

export default ProductCard;
