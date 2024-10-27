import { ProductPreviewPublicI } from './Product';

type DashboardT = ProductPreviewPublicI[];

export interface CommonDashboardsI {
    newest: DashboardT;
    popular: DashboardT;
}

export interface UserDashboardsI<T = DashboardT> {
    history: T;
}
