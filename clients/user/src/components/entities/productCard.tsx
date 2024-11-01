import Image from "next/image";
import NextLink from 'next/link';

import { ProductPreviewModel } from "@models/Product";
import { Card, CardContent } from "@components/ui/card";
import Price from "@components/ui/price";
import Label from "@components/ui/label";
import AppLink from "@components/ui/link";

interface Props {
    product: ProductPreviewModel
}

const ProductCard = ({ product }: Props) => {
    return (
        <Card className="w-full h-full">
            <CardContent className="relative">
                <div className="absolute top-2 left-2">
                    <ul className="flex flex-col gap-1">
                        {product.labels.map((i, k) => (
                            <li key={k}><Label type={i.type} value={i.value} /></li>
                        ))}
                    </ul>
                </div>
                <div>
                    <NextLink href=''>
                        <Image src={"/" + product.images[0]?.src} alt="loh" width="300" height="500" />
                    </NextLink>
                    {/* <ImageSlider images={product.images} /> */}
                </div>
                <div>
                    <div></div>
                    <div>{product.description}</div>
                    <Price current={product.price.current} old={product.price.old} />
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
