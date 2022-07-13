import { IPrice } from "@interfaces/Price";

export class Price implements IPrice {
    current: number;
    old: number;

    constructor({ current, old }: IPrice) {
        this.current = current;
        this.old = old < current ? null : old;
    }
}
