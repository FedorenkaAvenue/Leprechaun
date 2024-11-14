'use client';

import ProductPreview from "@entities/product/ui/Preview";
import { useWishList } from "@entities/wishlist/api/hook";

const WishList = () => {
    const { data } = useWishList();

    return (
        <ul className="grid grid-cols-5 gap-2">
            {
                data?.map(i => (
                    <li key={i.id}>
                        <ProductPreview product={i.product} />
                    </li>
                ))
            }
        </ul>
    );
};

export default WishList;
