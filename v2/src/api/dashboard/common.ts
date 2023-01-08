import { CommonDashboardSchema } from '@schemas/Dashboard';
import { appRequest } from '@api/index';

export type Model = CommonDashboardSchema;

export default async function getCommonDashboards(): Promise<Model> {
    return await appRequest<Model>('dashboard/common');
}
