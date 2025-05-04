import { DashboardSkeleton } from '@entities/dashboard/ui/Dashboard';
import Grid from '@shared/ui/Grid';

export default function Loading() {
    return (
        <Grid gap='xl'>
            <DashboardSkeleton />
            <DashboardSkeleton />
        </Grid>
    )
}
