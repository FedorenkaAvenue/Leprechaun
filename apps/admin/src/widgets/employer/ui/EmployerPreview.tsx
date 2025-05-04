import { FC } from 'react';

import { User } from '@entities/user/model/interfaces';
import EmployerPreview from '@entities/employer/ui/EmployerPreview';
import EmployerRoleSelectList from '@features/employer/ui/EmployerRoleSelectList';

interface Props {
    user: User
}

const EmployerPreviewWidget: FC<Props> = ({ user }) => {
    return (
        <EmployerPreview
            user={user}
            renderUserRole={({ id, role }) => <EmployerRoleSelectList userId={id} value={role} />}
        />
    );
};

export default EmployerPreviewWidget;
