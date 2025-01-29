import { useSelector } from 'react-redux';
import { FC } from 'react';

import { UserRole } from '@entities/user/model/enums';
import { userSelector } from '@entities/user/model/slice';

/**
 * @description check if user has access to visit page
 * @param {UserRole} accessRole minimal access role
 */
function withRoleGuard<T>(Component: FC<T>, accessRole: UserRole): FC<T> {
    return function WithRoleGuard(props: T) {
        const { data } = useSelector(userSelector);

        if (data && (data?.role <= accessRole)) {
            return (
                <div className='flex flex-col justify-center items-center gap-4'>
                    <div className='text-center'>
                        You have not access to visit this page
                        <br />
                        Plese, contact to admin.
                    </div>
                    <img src='/static/access_denied.gif' width='300' height='300' />
                </div>
            );
        }

        return <Component {...props as any} />;
    }
}

export default withRoleGuard;
