import { UserI } from "../user/user.interface";

export class EventHistoryProductPushDTO<D> {
    userId: UserI['id']
    product: D
}
