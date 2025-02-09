import { ProductCardSkeleton } from "@entities/product/ui/ProductCards";
import { Skeleton } from "@primitives/ui/skeleton";
import Grid from "@shared/ui/Grid";

export default function Loading() {
    return (
        <div>
            <Skeleton className='w-48 h-8 mb-3' />
            <Skeleton className='w-32 h-5 mb-4' />
            <Grid type='grid5'>
                {[...new Array(10)].map((_, i) => <ProductCardSkeleton key={i} />)}
            </Grid>
        </div>
    );
}
