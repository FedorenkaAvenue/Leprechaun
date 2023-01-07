import ProductCardSchema from './ProductCard';

export interface WishlistSchema {
    id: string;
    product: ProductCardSchema;
    created_at: Date;
}
