import { OrderItemCardSkeleton } from "@entities/order/ui/OrderItemCard";

export default function Loading() {
    return (
        <div className='flex flex-col gap-2'>
            {[...new Array(3)].map((_, i) => <OrderItemCardSkeleton key={i} />)}
        </div>
    )
}
