import Image from 'next/image';

import ProductCardSchema from '@interfaces/ProductCard';

export default function ProductCard({ title, images }: ProductCardSchema) {
    return (
        <div className="">
            <Image src={`http://media.leprechaun.loc/${images[0].src}`} alt="title" width={50} height={50} />
            <div>{title}</div>
        </div>
    );
}
