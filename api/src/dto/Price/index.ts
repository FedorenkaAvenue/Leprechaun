import { PriceEntity } from '@entities/_Price';
import { IPrice } from '@interfaces/Price';

export class PriceDTO extends PriceEntity implements IPrice {}
