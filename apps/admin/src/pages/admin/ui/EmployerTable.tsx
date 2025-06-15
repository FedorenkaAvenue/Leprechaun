import { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router';

import { useEmployerList } from '@entities/employer/model/hooks';
import ContentListManager from '@shared/ui/ContentListManager';
import EmployerPreviewWidget from '@widgets/employer/ui/EmployerPreview';
import routerSubConfig from '@shared/config/router';
import withRoleGuardPage from '@shared/hocs/withRoleGuardPage';
import { UserRole } from '@gen/user';

const EmployerTable: FC = () => {
    const { data, isFetching } = useEmployerList();
    const nav = useNavigate();

    return (
        <div>
            <ContentListManager
                isLoading={isFetching}
                addItemHandle={() => nav(routerSubConfig.employerCreate.path)}
            >
                <TableContainer component={Paper}>
                    <Table aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow >
                                <TableCell sx={{ fontWeight: 700 }} align="left">Id</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="left">Email</TableCell>
                                <TableCell sx={{ fontWeight: 700 }} align="right">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map(employer => (<EmployerPreviewWidget key={employer.id} user={employer} />))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ContentListManager>
        </div>
    );
};

export default withRoleGuardPage(EmployerTable, UserRole.ADMIN);
