import { WishlistSkeleton } from '@entities/wishlist/ui/Wishlist';
import { Skeleton } from '@primitives/ui/skeleton';
import Grid from '@shared/ui/Grid';

export default function Loading() {
    return (
        <div>
            <Skeleton className='h-7 w-64 mb-5' />
            <Grid direction='column' size='l'>
                {[...new Array(3)].map((_, i) => <WishlistSkeleton key={i} />)}
            </Grid>
        </div>
    );
}
