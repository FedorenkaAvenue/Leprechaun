import { FC } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { PriceModel } from "../models/Price";
import { CURRENCY } from "@shared/constants/content";
import { cn } from "@primitives/lib/utils";

export interface Props extends VariantProps<typeof oldPriceVariants> {
    price: PriceModel
    classNames?: string
}

const oldPriceVariants = cva(
    ['relative', 'top-1', 'text-secondary-foreground', 'text-decoration-line: line-through'],
    {
        variants: {
            size: {
                small: ['text-xs'],
                medium: ['text-sm'],
                large: ['text-lg'],
            },
        },
        defaultVariants: {
            size: 'medium',
        }
    }
);

const currentPriceVariants = cva(
    ['text-achtung'],
    {
        variants: {
            size: {
                small: ['text-base font-bold'],
                medium: ['text-2xl'],
                large: ['text-3xl'],
            },
        },
        defaultVariants: {
            size: 'medium',
        }
    }
);

const Price: FC<Props> = ({ price: { current, old }, size, classNames }) => (
    <div className={classNames}>
        {
            old && (
                <div className={cn(oldPriceVariants({ size }))}>
                    {old}<span>{CURRENCY}</span>
                </div>
            )
        }
        <div className={cn(currentPriceVariants({ size }))}>
            {current}<span>{CURRENCY}</span>
        </div>
    </div>
);

export default Price;
