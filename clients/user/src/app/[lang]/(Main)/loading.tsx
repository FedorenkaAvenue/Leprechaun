import { DashboardSkeleton } from "@entities/dashboard/ui/Dashboard";

export default function Loading() {
    return (
        <div>
            <DashboardSkeleton />
            <DashboardSkeleton />
        </div>
    )
}
