import { ProductLabel } from "./product.enum";
import { Label, ProductPublic } from "./product.dto";
import { ProductI } from "@core/product/product.interface";
import getPercentDifference from '@shared/utils/getPercentDifference';

/**
 * @description set labels key for wrapped class. queue of label type is important
 * @param labels list of label types
 */
export default function WithLabelsDecorator(...labels: ProductLabel[]) {
    return function <T extends { new(...args: any[]): {} }>(constr: T) {
        return class Kozyan extends constr {
            labels: ProductPublic['labels'];

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
                        case ProductLabel.DISCOUNT: {
                            if (typeof old === 'number' && old > current) {
                                this.labels.push(new Label(ProductLabel.DISCOUNT, getPercentDifference(old, current)));
                            }

                            break;
                        }

                        case ProductLabel.POPULAR: {
                            if (rating > 70) this.labels.push(new Label(ProductLabel.POPULAR, 'популярнi')); // TODO: trans

                            break;
                        }

                        case ProductLabel.NEW: {
                            if (is_new) this.labels.push(new Label(ProductLabel.NEW, 'новинки'));

                            break;
                        }
                    }
                });
            }
        };
    };
}
