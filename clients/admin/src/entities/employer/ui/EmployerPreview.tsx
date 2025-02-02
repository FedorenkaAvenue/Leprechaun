import { FC, ReactNode } from 'react';

import { User } from '@entities/user/model/interfaces';
import { TableCell, TableRow } from '@mui/material';

interface Props {
    user: User
    renderUserRole: (user: User) => ReactNode
}

const EmployerPreview: FC<Props> = ({ user, renderUserRole }) => {
    return (
        <TableRow className="hover-item">
            <TableCell align="left">{user.id}</TableCell>
            <TableCell align="left">{user.email}</TableCell>
            <TableCell align='right'>
                {renderUserRole(user)}
            </TableCell>
        </TableRow >
    );
};

export default EmployerPreview;
