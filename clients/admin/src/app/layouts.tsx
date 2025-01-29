import { Outlet, useNavigate } from 'react-router';
import { PageContainer } from '@toolpad/core/PageContainer';
import { Account, DashboardLayout } from '@toolpad/core';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { userSelector } from '@entities/user/model/slice';
import routerSubConfig from '@shared/config/router';
import { Button } from '@mui/material';

// function Lal() {
//     const { data } = useSelector(userSelector);

//     return (
//         <div>
//             email: {data?.email}
//             role: {data?.role}
//         </div>
//     )
// }

// function UserAccIcon() {
//     return (
//         <Account
//             localeText={{
//                 signInLabel: 'loh',
//                 signOutLabel: 'llaaa',
//             }}
//             slots={{
//                 popoverContent: Lal,
//                 signInButton: Button,
//                 signOutButton: Button,
//             }}
//             slotProps={{
//                 signInButton: {
//                     onClick: () => alert('lol'),
//                 },
//                 signOutButton: {
//                     onClick: () => alert('lol'),
//                 }
//             }}
//         />
//     );
// }

export function AuthLayout() {
    const { isAuth } = useSelector(userSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) navigate(routerSubConfig.auth.path);
    }, [isAuth]);

    return isAuth
        ? (
            <DashboardLayout
                defaultSidebarCollapsed={true}
            // slots={{ toolbarAccount: UserAccIcon }}
            >
                <PageContainer sx={{ maxWidth: 'none !important' }} title=''>
                    <Outlet />
                </PageContainer>
            </DashboardLayout>
        ) : null
}

export function NonAuthLayout() {
    const { isAuth } = useSelector(userSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) navigate('/');
    }, [isAuth]);

    return isAuth ? null : <Outlet />;
}
