import { z } from 'zod';

enum ProductStatusE {
    AVAILABLE = 1,
    OUT_OF_STOCK,
}

const ProductStatus = z.nativeEnum(ProductStatusE);
export type ProductStatusT = z.infer<typeof ProductStatus>;

export default ProductStatus;
