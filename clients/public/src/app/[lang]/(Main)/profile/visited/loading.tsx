import { ProductCardPreviewSkeleton } from '@entities/product/ui/ProductCards';
import { Skeleton } from '@primitives/ui/skeleton';
import Grid from '@shared/ui/Grid';

export default function Loading() {
    return (
        <div>
            <Skeleton className='h-7 w-64 mb-5' />
            <Grid type='column'>
                {[...new Array(4)].map((_, i) => <ProductCardPreviewSkeleton key={i} />)}
            </Grid>
        </div>
    )
}
