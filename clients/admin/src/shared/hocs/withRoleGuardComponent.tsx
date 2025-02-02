import clsx from 'clsx';
import { FC, useMemo } from 'react';
import { Tooltip } from '@mui/material';

import { UserRole } from '@entities/user/model/enums';
import { useEmployerOwn } from '@entities/employer/model/hooks';

/**
 * @description blur component if user hasn't access to use it component
 * @param {UserRole} accessRole minimal access role
 */
function withRoleGuardComponent<T>(Component: FC<T>, accessRole: UserRole): FC<T> {
    return function withRoleGuardComponent(props: T) {
        const { data } = useEmployerOwn();

        const isDenied = useMemo(() => data && (data?.role < accessRole), [data]);

        return (
            <Tooltip
                title="You have no access to do this"
                arrow
                enterDelay={1000}
                enterNextDelay={1000}
                classes={{ tooltip: '!bg-red-600', arrow: '!text-red-600' }}
                disableHoverListener={!isDenied}
                disableFocusListener={!isDenied}
                disableTouchListener={!isDenied}
            >
                <span className='inline-block pointer-events-auto'>
                    <span className={clsx(isDenied && 'opacity-35 pointer-events-none')}>
                        <Component {...props as any} />
                    </span>
                </span>
            </Tooltip>
        )
    }
}

export default withRoleGuardComponent;
