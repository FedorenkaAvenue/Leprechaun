import { cva, type VariantProps } from 'class-variance-authority';

import Label, { LabelProps } from '@shared/ui/Label';
import { ProductLabelType } from '@gen/product';

const labelVariants = cva(
    'rounded',
    {
        variants: {
            type: {
                [ProductLabelType.DISCOUNT_LABEL]: 'bg-achtung text-achtung-foreground',
                [ProductLabelType.NEW_LABEL]: 'bg-success text-achtung-foreground',
                [ProductLabelType.POPULAR_LABEL]: 'bg-primary text-primary-foreground',
                [ProductLabelType.UNRECOGNIZED]: '', // ? WTF
            },
        },
    },
);

type Props = LabelProps & VariantProps<typeof labelVariants>;

const ProductLabel = ({ type, ...props }: Props) => {
    return <Label classNames={labelVariants({ type })} {...props} />;
};

export default ProductLabel;
