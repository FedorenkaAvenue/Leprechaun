import { forwardRef, ReactNode } from "react";

import Select, { CustomSelectProps } from "@shared/ui/Select";
import { USER_ROLE_OPTIONS } from "@entities/user/constants/userRoleOptions";
import withRoleGuardComponent from "@shared/hocs/withRoleGuardComponent";
import { User, UserRole } from "@gen/user";

type Props = {
    userId: User['id']
    value: UserRole | undefined
} & Omit<CustomSelectProps, 'options' | 'label'>;

const EmployerRoleSelectList = forwardRef<ReactNode, Props>(({ value, ...props }, ref) => {
    return (
        <Select
            {...props}
            onChange={() => alert('хуя')}
            ref={ref}
            label="Select user role"
            value={value}
            options={USER_ROLE_OPTIONS}
        />
    );
});

EmployerRoleSelectList.displayName = 'EmployerRoleSelectList';

export default withRoleGuardComponent(EmployerRoleSelectList, UserRole.ROOT);
