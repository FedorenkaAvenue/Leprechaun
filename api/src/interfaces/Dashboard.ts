import { ProductPreviewI } from './Product';

type DashboardT = Array<ProductPreviewI>;

export interface CommonDashboardsI {
    newest: DashboardT;
    popular: DashboardT;
}

export interface UserDashboardsI<T = DashboardT> {
    history: T;
}
