import { LabelDTO } from "@dto/Label";
import { LabelType } from "@enums/Label";
import { IProduct } from "@interfaces/Product";
import getPercentDifference from "@utils/getPercentDifference";

/**
 * @description set labels key for wrapped class. queue of label type is important
 * @param labels list of label types
 */
export default function WithLabels(...labels: Array<LabelType>) {
    return function <T extends { new(...args: any[]): {} }>(constr: T) {
        return class extends constr {
            labels: IProduct['labels'];
    
            constructor(...args: any[]) {
                super(...args);
                this.labels = [];

                const { price: { old, current }, is_new } = args[0] as IProduct;

                labels.forEach(label => {
                    switch(label) {
                        case LabelType.DISCOUNT: {
                            if (typeof old === 'number' && (old > current)) {
                                this.labels = [
                                    ...this.labels,
                                    new LabelDTO(
                                        LabelType.DISCOUNT,
                                        getPercentDifference(old, current)
                                    )
                                ];
                            }

                            break;
                        }

                        case LabelType.NEW: {
                            if (is_new) {
                                this.labels = [
                                    ...this.labels,
                                    new LabelDTO(LabelType.NEW, 'новинки')
                                ];
                            }

                            break;
                        }
                    }
                });
            }
        }
    }
}
