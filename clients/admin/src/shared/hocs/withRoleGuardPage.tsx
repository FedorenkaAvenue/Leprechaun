import { FC } from 'react';
import { Typography } from '@mui/material';

import { UserRole } from '@entities/user/model/enums';
import { useUser } from '@entities/user/model/hooks';

/**
 * @description check if user has access to visit page
 * @param {UserRole} accessRole minimal access role
 */
function withRoleGuardPage<T>(Component: FC<T>, accessRole: UserRole): FC<T> {
    return function withRoleGuardPage(props: T) {
        const { data } = useUser();

        if (data && (data?.role <= accessRole)) {
            return (
                <div className='flex flex-col justify-center items-center gap-4'>
                    <Typography align='center'>
                        You have not access to visit this page.
                        <br />
                        Please, contact to admin.
                    </Typography>
                    <img src='/static/access_denied.gif' width='300' height='300' />
                </div>
            );
        }

        return <Component {...props as any} />;
    }
}

export default withRoleGuardPage;
