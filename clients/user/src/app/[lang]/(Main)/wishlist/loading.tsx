import { WishlistSkeleton } from "@entities/wishlist/ui/Wishlist";

export default function Loading() {
    return (
        <div className='flex flex-col gap-3'>
            {[...new Array(3)].map((_, i) => <WishlistSkeleton key={i} />)}
        </div>
    );
}
