import { PriceI } from '@interfaces/Price';
import { PriceDTO } from '.';

export class Price extends PriceDTO {
    constructor({ current, old }: PriceI) {
        super();
        this.current = current;
        this.old = old < current ? null : old;
    }
}
