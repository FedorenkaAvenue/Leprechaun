import DashboardIcon from '@mui/icons-material/Dashboard';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet, useNavigate } from 'react-router';
import { Authentication, type Navigation } from '@toolpad/core';
import CategoryIcon from '@mui/icons-material/Category';
import CycloneIcon from '@mui/icons-material/Cyclone';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import BuildIcon from '@mui/icons-material/Build';
import BluetoothAudioIcon from '@mui/icons-material/BluetoothAudio';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import routerSubConfig from '@shared/config/router';
import InternalServerErrorPage from '@pages/error/ui/500';
import { errorSelector } from '@shared/models/slices/error';
import { authSelector, authSignOutAction } from '@shared/models/slices/auth';
import { useEmployerOwn } from '@entities/employer/model/hooks';
import { useAppDispatch } from '@shared/models/hooks';

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
    {
        kind: 'divider',
    },
    {
        segment: 'admin',
        title: 'Admin',
        icon: <FingerprintIcon />,
        children: [
            {
                segment: 'employers',
                title: 'Employers',
                icon: <PeopleAltIcon />,
            },
        ],
    },
];

export default function App() {
    const err = useSelector(errorSelector);
    const auth = useSelector(authSelector);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data } = useEmployerOwn(undefined, { skip: !auth.isAuth });

    const authentication: Authentication = useMemo(() => ({
        signIn: () => navigate(routerSubConfig.auth.path),
        signOut: () => dispatch(authSignOutAction()),
    }), []);

    if (err.hasError) return <InternalServerErrorPage canUseClient />;

    return (
        <ReactRouterAppProvider
            navigation={NAVIGATION}
            branding={{
                logo: <img src="/static/logo.svg" />,
                title: import.meta.env.VITE_APP_NAME,
            }}
            session={{ user: data || undefined }}
            authentication={authentication}
        >
            <Outlet />
        </ReactRouterAppProvider>
    );
}
