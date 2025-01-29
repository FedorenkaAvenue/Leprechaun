import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { FC } from 'react';

import { UserRole } from '@entities/user/model/enums';
import { userSelector } from '@entities/user/model/slice';

/**
 * @description blur component if user hasn't access to use it component
 * @param {UserRole} accessRole minimal access role
 */
function withRoleBlur<T>(Component: FC<T>, accessRole: UserRole): FC<T> {
    return function WithRoleBlur(props: T) {
        const { data } = useSelector(userSelector);

        return (
            <span className={clsx(data && (data?.role <= accessRole) && 'opacity-35 pointer-events-none')}>
                <Component {...props as any} />
            </span>
        )
    }
}

export default withRoleBlur;
