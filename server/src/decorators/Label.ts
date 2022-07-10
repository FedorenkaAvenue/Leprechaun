import { LabelDTO } from "@dto/Label";
import { LabelType } from "@enums/Label";
import getPercentDifference from "@utils/getPercentDifference";
import { IProduct } from "@src/interfaces/Product";

/**
 * @description add "discount" label to {product.labels} key
 */
export function WithDiscountLabel<T extends { new(...args: any[]): {} }>(
    constr: T
) {
    return class extends constr {
        labels: IProduct['labels'];

        constructor(...args: any[]) {
            super(...args);

            const { price: { old, current } } = args[0] as IProduct;

            if (typeof old === 'number' && (old > current)) {
                this.labels = [
                    ...this.labels,
                    new LabelDTO(
                        LabelType.DISCOUNT,
                        getPercentDifference(old, current)
                    )
                ];
            }
        }
    }
}

/**
 * @description add "new" label to {product.labels} key
 */
export function WithNoveltyLabel<T extends { new(...args: any[]): {} }>(constr: T) {
    return class extends constr {
        labels: IProduct['labels'];

        constructor(...args: any[]) {
            super(...args);

            const { is_new } = args[0] as IProduct;
            
            if (is_new) {
                this.labels = [
                    ...this.labels,
                    new LabelDTO(LabelType.NEW)
                ];
            }
        }
    }
}
