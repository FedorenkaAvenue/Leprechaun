import { IProductPreview } from './Product';

type TDashboard = Array<IProductPreview>;

export interface ICommonDashboards {
    newest: TDashboard;
    popular: TDashboard;
}

export interface IUserDashboards<T = TDashboard> {
    history: T;
}
