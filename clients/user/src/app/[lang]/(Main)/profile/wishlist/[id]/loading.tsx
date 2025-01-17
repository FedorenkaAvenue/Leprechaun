import { ProductCardPreviewSkeleton } from '@entities/product/ui/ProductCards';
import { Skeleton } from '@primitives/ui/skeleton';
import Grid from '@shared/ui/Grid';

export default function Loading() {
    return (
        <div className='flex flex-col gap-4'>
            <Skeleton className='h-8 w-60' />
            <Skeleton className='h-10 w-40' />
            <Grid type='column'>
                {[...new Array(5)].map((_, i) => <ProductCardPreviewSkeleton key={i} />)}
            </Grid>
        </div>
    )
}
