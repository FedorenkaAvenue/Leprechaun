import { IProductPreview } from './Product';

type TDashboard = Array<IProductPreview>

export interface ICommonDashboards {
    newest: TDashboard
    popular: TDashboard
}

export interface IUserDashboards<TListType = TDashboard> {
    history: TListType
}
