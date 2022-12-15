import { SearchItemDTO } from '.';

export class SearchItem extends SearchItemDTO {
    constructor({ type, item }: SearchItem) {
        super();
        this.type = type;
        this.item = item._source;
    }
}
