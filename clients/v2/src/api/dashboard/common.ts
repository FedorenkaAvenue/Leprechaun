import { CommonDashboardSchema } from '@schemas/Dashboard';

export type Model = CommonDashboardSchema;

export default async function getCommonDashboards(): Promise<Model> {
    const res = await fetch('http://api.leprechaun.loc/dashboard/common');

    return res.json();
}
