import { PriceI } from '@interfaces/Price';
import { PriceEntity } from '@entities/_Price';

export class PriceDTO extends PriceEntity {
    constructor({ current, old }: PriceI) {
        super();
        this.current = current;
        this.old = (old && (old > current)) ? old : null;
    }
}
