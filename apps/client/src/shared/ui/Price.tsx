import { FC } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

import { PriceModel } from '../models/Price';
import { CURRENCY } from '@shared/constants/content';
import { cn } from '@primitives/lib/utils';

export interface Props extends VariantProps<typeof oldPriceVariants> {
    price: PriceModel
    classNames?: string
    isUnavailable?: boolean
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
            status: {
                available: [],
                unavailable: ['text-muted-primary-foreground'],
            }
        },
        defaultVariants: {
            size: 'medium',
            status: 'available',
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
            status: {
                available: [],
                unavailable: ['text-muted-primary-foreground'],
            }
        },
        defaultVariants: {
            size: 'medium',
            status: 'available',
        }
    }
);

const Price: FC<Props> = ({ price: { current, old }, size, isUnavailable, classNames }) => (
    <div className={cn(classNames, isUnavailable && 'opacity-35')}>
        {
            old && (
                <div className={cn(oldPriceVariants({ size, status: isUnavailable ? 'unavailable' : 'available' }))}>
                    {old}<span>{CURRENCY}</span>
                </div>
            )
        }
        <div className={cn(currentPriceVariants({ size, status: isUnavailable ? 'unavailable' : 'available' }))}>
            {current}<span>{CURRENCY}</span>
        </div>
    </div>
);

export default Price;
