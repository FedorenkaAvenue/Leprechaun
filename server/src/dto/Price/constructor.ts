import { IPrice } from "@interfaces/Price";
import { PriceDTO } from ".";

export class Price extends PriceDTO {
    constructor({ current, old }: IPrice) {
        super();
        this.current = current;
        this.old = old < current ? null : old;
    }
}
