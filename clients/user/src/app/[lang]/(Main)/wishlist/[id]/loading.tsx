import { ProductCardPreviewSkeleton } from "@entities/product/ui/ProductCards";
import { Skeleton } from "@primitives/ui/skeleton";

export default function Loading() {
    return (
        <div className='flex flex-col gap-4'>
            <Skeleton className="h-8 w-32" />
            <Skeleton className='h-10 w-40' />
            <div className='flex gap-1'>
                {[...new Array(5)].map((_, i) => <ProductCardPreviewSkeleton key={i} />)}
            </div>
        </div>
    )
}
