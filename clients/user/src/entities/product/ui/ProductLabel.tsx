import { cva, type VariantProps } from 'class-variance-authority';

import Label, { LabelProps } from '@shared/ui/Label';
import { ProductLabelModel } from '../model/enums';

const labelVariants = cva(
    'rounded',
    {
        variants: {
            type: {
                [ProductLabelModel.DISCOUNT]: 'bg-achtung text-achtung-foreground',
                [ProductLabelModel.NEW]: 'bg-success text-achtung-foreground',
                [ProductLabelModel.POPULAR]: 'bg-primary text-primary-foreground',
            },
        },
    },
);

type Props = LabelProps & VariantProps<typeof labelVariants>;

const ProductLabel = ({ type, ...props }: Props) => {
    return <Label classNames={labelVariants({ type })} {...props} />;
};

export default ProductLabel;
