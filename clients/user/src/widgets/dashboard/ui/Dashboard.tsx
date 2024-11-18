import { FC } from 'react';

import { DashboardContent } from '@entities/dashboard/model/DashboardContent';
import DashboardEntity from '@entities/dashboard/ui/Dashboard';
import useContentTypeData from '../lib/useContentTypeData';

interface Props {
    contentType: DashboardContent
}

const Dashboard: FC<Props> = ({ contentType }) => {
    const { data, isLoading } = useContentTypeData(contentType);

    return <DashboardEntity list={data} title='test' isLoading={isLoading} />;
};

export default Dashboard;
