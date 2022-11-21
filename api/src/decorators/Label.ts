import { LabelType } from '@enums/Label';
import { ProductI } from '@interfaces/Product';
import { Label } from '@dto/Label/constructor';
import getPercentDifference from '@utils/getPercentDifference';

/**
 * @description set labels key for wrapped class. queue of label type is important
 * @param labels list of label types
 */
export default function WithLabels(...labels: LabelType[]) {
    return function <T extends { new (...args: any[]): {} }>(constr: T) {
        return class Kozyan extends constr {
            labels: ProductI['labels'];

            constructor(...args: any[]) {
                super(...args);
                this.labels = [];

                const {
                    price: { old, current },
                    is_new,
                    rating,
                } = args[0] as ProductI;

                labels.forEach(label => {
                    switch (label) {
                        case LabelType.DISCOUNT: {
                            if (typeof old === 'number' && old > current) {
                                this.labels.push(new Label(LabelType.DISCOUNT, getPercentDifference(old, current)));
                            }

                            break;
                        }

                        case LabelType.POPULAR: {
                            if (rating > 70) this.labels.push(new Label(LabelType.POPULAR, 'популярнi'));

                            break;
                        }

                        case LabelType.NEW: {
                            if (is_new) this.labels.push(new Label(LabelType.NEW, 'новинки'));

                            break;
                        }
                    }
                });
            }
        };
    };
}
