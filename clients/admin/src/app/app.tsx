import DashboardIcon from '@mui/icons-material/Dashboard';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet, useNavigate } from 'react-router';
import { Authentication, type Navigation } from '@toolpad/core';
import CategoryIcon from '@mui/icons-material/Category';
import CycloneIcon from '@mui/icons-material/Cyclone';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BuildIcon from '@mui/icons-material/Build';
import BluetoothAudioIcon from '@mui/icons-material/BluetoothAudio';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

import routerSubConfig from '@shared/config/router';
import { userSelector } from '@entities/user/model/slice';

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
    {
        segment: routerSubConfig.propertyGroupList.segment,
        title: routerSubConfig.propertyGroupList.title,
        icon: <CycloneIcon />,
    },
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
    },
];

export default function App() {
    const { data } = useSelector(userSelector);
    const navigate = useNavigate();

    const auth: Authentication = useMemo(() => ({
        signIn: () => navigate(routerSubConfig.auth.path),
        signOut: () => alert('out'),
    }), []);

    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="./public/icon.svg" />,
                title: import.meta.env.VITE_APP_NAME,
            }}
            session={{ user: data || undefined }}
            authentication={auth}
        >
            <Outlet />
        </ReactRouterAppProvider>
    );
}
