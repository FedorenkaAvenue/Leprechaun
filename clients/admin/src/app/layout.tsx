import { Outlet } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';
import { DashboardLayout } from '@toolpad/core';

export default function Layout() {
    return (
        <DashboardLayout>
            <PageContainer
                sx={{ maxWidth: 'none !important' }}
                title=''
            >
                <Outlet />
            </PageContainer>
        </DashboardLayout>
    );
}
