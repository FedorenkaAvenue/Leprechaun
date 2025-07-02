import {
    Trans,
    TransData,
    TransList,
    TransListSearchParams,
    TransMap,
    TransSearchParams,
    TransServiceController,
    TransServiceControllerMethods,
    TransUpdateParams,
} from "@fedorenkaavenue/leprechaun_lib_entities/server/trans";
import TransService from "./trans.service";

@TransServiceControllerMethods()
export default class TransController implements TransServiceController {
    constructor(private readonly transService: TransService) { }

    getTrans({ id }: TransSearchParams): Promise<Trans> {
        return this.transService.getTrans(id);
    }

    async getTransList({ ids }: TransListSearchParams): Promise<TransList> {
        const res = await this.transService.getTransList(ids);

        return { items: res };
    }

    async getTransMap({ ids }: TransListSearchParams): Promise<TransMap> {
        const res = await this.transService.getTransMap(ids);

        return { items: res };
    }

    createTrans(data: TransData): Promise<Trans> {
        return this.transService.createTrans(data);
    }

    updateTrans({ id, data }: TransUpdateParams): Promise<void> {
        return this.transService.updateTrans(id, data);
    }

    deleteTrans({ id }: TransSearchParams): Promise<void> {
        return this.transService.deleteTrans(id);
    }
}
