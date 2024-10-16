import * as React from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import GroupIcon from '@mui/icons-material/Group';
// import NatIcon from '@mui/icons-material/Nat';
import CategoryIcon from '@mui/icons-material/Category';
import CycloneIcon from '@mui/icons-material/Cyclone';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import BreadCrumbs from '@widgets/navigation/ui/BreadCrumbs';

import { PROPERTY_GROUP_PATH_SEGMENT } from '@shared/constants/routes';

const NAVIGATION = [
    {
        kind: 'header',
        title: 'Tools',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'categories',
        title: 'Categories',
        icon: <CategoryIcon />,
    },
    {
        segment: 'products',
        title: 'Products',
        icon: <CheckroomIcon />,
    },
    {
        kind: 'divider',
    },
    {
        segment: 'users',
        title: 'Users',
        icon: <GroupIcon />,
    },
    {
        segment: 'orders',
        title: 'Orders',
        icon: <ShoppingCartIcon />,
    },
    {
        kind: 'divider',
    },
    {
        segment: PROPERTY_GROUP_PATH_SEGMENT,
        title: 'Property group',
        icon: <CycloneIcon />,
    },
    // {
    //     segment: 'properties',
    //     title: 'Properties',
    //     icon: <NatIcon />,
    // },
    {
        kind: 'divider',
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'reports',
        title: 'Reports',
        icon: <BarChartIcon />,
        children: [
            {
                segment: 'sales',
                title: 'Sales',
                icon: <DescriptionIcon />,
            },
            {
                segment: 'traffic',
                title: 'Traffic',
                icon: <DescriptionIcon />,
            },
        ],
    },
    {
        segment: 'integrations',
        title: 'Integrations',
        icon: <LayersIcon />,
    },
];


function DashboardLayoutBasic() {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const router = React.useMemo(() => {
        return {
            pathname,
            searchParams: new URLSearchParams(),
            navigate: (path: string) => navigate(path),
        };
    }, [navigate, pathname]);

    return (
        <AppProvider
            //@ts-ignore
            navigation={NAVIGATION}
            //@ts-ignore
            router={router}
            branding={{
                // logo: <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwzFCNZBrxYW-yfhaythKch7J3B4OGrDEQ3g&s" />,
                title: import.meta.env.VITE_APP_NAME + ' admin',
            }}
        >
            <DashboardLayout>
                <div className='flex flex-col gap-5 p-5'>
                    <BreadCrumbs />
                    <Divider />
                    <Outlet />
                </div>
            </DashboardLayout>
        </AppProvider>
    );
}

export default DashboardLayoutBasic;
