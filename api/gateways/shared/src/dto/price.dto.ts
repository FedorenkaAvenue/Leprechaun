import { PriceI } from "../interfaces/price.interface";

export class PriceDTO implements PriceI {
    current: number;
    old: number | null;

    constructor({ current, old }: PriceI) {
        this.current = current;
        this.old = (old && (old > current)) ? old : null;
    }
}
