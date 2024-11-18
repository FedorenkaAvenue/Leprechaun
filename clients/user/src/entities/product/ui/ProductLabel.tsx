import { cva, type VariantProps } from "class-variance-authority";

import Label, { LabelProps } from "@shared/ui/label";
import { ProductLabelModel } from "../models/Label";

const labelVariants = cva(
    'rounded-2xl',
    {
        variants: {
            type: {
                [ProductLabelModel.DISCOUNT]: 'bg-achtung text-achtung-foreground',
                [ProductLabelModel.NEW]: 'bg-achtung-secondary text-achtung-secondary-foreground',
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
