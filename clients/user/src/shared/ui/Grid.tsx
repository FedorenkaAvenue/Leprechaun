import { cva, VariantProps } from 'class-variance-authority';
import { FC, PropsWithChildren } from 'react';

import { cn } from '@primitives/lib/utils';

export type GridVariants = VariantProps<typeof gridVariants>;

const gridVariants = cva(
    ['flex', 'flex-wrap'],
    {
        variants: {
            size: {
                s: ['gap-1'],
                m: ['gap-2'],
                l: ['gap-3'],
                xl: ['gap-5'],
            },
            direction: {
                column: ['flex-col'],
                raw: [],
            }
        },
        defaultVariants: {
            size: 'm',
            direction: 'raw',
        }
    }
)

interface Props extends GridVariants {
    className?: string
}

const Grid: FC<PropsWithChildren<Props>> = ({ className, size, direction, children }) => (
    <ul className={cn(className, gridVariants({ size, direction }))}>
        {children}
    </ul>
);

export default Grid;
