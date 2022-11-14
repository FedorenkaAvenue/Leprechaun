import { PriceEntity } from '@entities/_Price';
import { PriceI } from '@interfaces/Price';

export class PriceDTO extends PriceEntity implements PriceI {}
