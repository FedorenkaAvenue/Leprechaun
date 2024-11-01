import { cva, type VariantProps } from "class-variance-authority";

import { LabelModel } from "@models/Product";
import { cn } from "@lib/utils";
import { Label as LabelE } from '@models/Product';

const labelVariants = cva(
    'rounded-2xl',
    {
        variants: {
            type: {
                [LabelE.DISCOUNT]: 'bg-achtung text-achtung-foreground',
                [LabelE.NEW]: 'bg-achtung-secondary text-achtung-secondary-foreground',
                [LabelE.POPULAR]: 'bg-primary text-primary-foreground',
            },
        },
    },
);

interface Props extends VariantProps<typeof labelVariants> {
    value: LabelModel['value']
}

const Label = ({ type, value }: Props) => {
    return (
        <span className={cn("px-2 py-0.5", labelVariants({ type }))}>
            {value}
        </span>
    );
};

export default Label;
