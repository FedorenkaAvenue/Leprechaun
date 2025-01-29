import DashboardIcon from '@mui/icons-material/Dashboard';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import { type Navigation } from '@toolpad/core';
import CategoryIcon from '@mui/icons-material/Category';
import CycloneIcon from '@mui/icons-material/Cyclone';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BuildIcon from '@mui/icons-material/Build';
import BluetoothAudioIcon from '@mui/icons-material/BluetoothAudio';

import routerSubConfig from '@shared/config/router';

const NAVIGATION: Navigation = [
    {
        kind: 'header',
        title: 'Entities',
    },
    {
        segment: 'dashboard',
        title: 'Dashboard',
        icon: <DashboardIcon />,
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
    // {
    //     segment: 'users',
    //     title: 'Users',
    //     icon: <GroupIcon />,
    // },
    // {
    //     segment: 'orders',
    //     title: 'Orders',
    //     icon: <ShoppingCartIcon />,
    // },
    // {
    //     kind: 'divider',
    // },
    {
        segment: routerSubConfig.propertyGroupList.segment,
        title: routerSubConfig.propertyGroupList.title,
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
        segment: routerSubConfig.tools.segment,
        title: routerSubConfig.tools.title,
        icon: <BuildIcon />,
    },
    {
        kind: 'header',
        title: 'Analytics',
    },
    {
        segment: 'connections',
        title: 'Connections',
        icon: <BluetoothAudioIcon />,
    }
    // {
    //     segment: 'reports',
    //     title: 'Reports',
    //     icon: <BarChartIcon />,
    //     children: [
    //         {
    //             segment: 'sales',
    //             title: 'Sales',
    //             icon: <DescriptionIcon />,
    //         },
    //         {
    //             segment: 'traffic',
    //             title: 'Traffic',
    //             icon: <DescriptionIcon />,
    //         },
    //     ],
    // },
    // {
    //     segment: 'integrations',
    //     title: 'Integrations',
    //     icon: <LayersIcon />,
    // },
];

export default function App() {
    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="./public/icon.svg" />,
                title: import.meta.env.VITE_APP_NAME,
            }}>
            <Outlet />
        </ReactRouterAppProvider>
    );
}
