import { map, Observable } from "rxjs";
import { Controller } from "@nestjs/common";

import {
    HistoryListPublic, HistorySearchParamsPublic, HistoryServiceController, HistoryServiceControllerMethods,
} from "gen/history";
import { HistoryService } from "./history/history.service";

@Controller()
@HistoryServiceControllerMethods()
export default class AppController implements HistoryServiceController {
    constructor(private readonly historyService: HistoryService) { }

    getHistoryListPublic({ user, queries }: HistorySearchParamsPublic): Observable<HistoryListPublic> {
        return this.historyService.getHistoryListPublic(user, queries).pipe(
            map(res => ({ items: res }))
        )
    }
}
