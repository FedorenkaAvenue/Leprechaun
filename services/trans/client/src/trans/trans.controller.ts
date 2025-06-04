import { Observable } from "rxjs";

import { Trans, TransCreateDTO, TransDTO, TransServiceController, TransServiceControllerMethods } from "gen/ts/trans";
import TransService from "./trans.service";

@TransServiceControllerMethods()
export default class TransController implements TransServiceController {
    constructor(
        private readonly transService: TransService,
    ) { }

    getTrans(request: TransDTO): Promise<Trans> {
        return this.transService.getTrans(request);
    }

    createTrans(request: TransCreateDTO): Promise<Trans> | Observable<Trans> | Trans {
        throw new Error("Method not implemented.");
    }

    deleteTrans(request: TransDTO): void {
        throw new Error("Method not implemented.");
    }
}
