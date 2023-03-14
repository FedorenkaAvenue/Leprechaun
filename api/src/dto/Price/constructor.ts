import { PriceI } from '@interfaces/Price';
import { PriceEntity } from '@entities/_Price';

export class Price extends PriceEntity {
    constructor({ current, old }: PriceI) {
        super();
        this.current = current;
        this.old = old < current ? null : old;
    }
}
