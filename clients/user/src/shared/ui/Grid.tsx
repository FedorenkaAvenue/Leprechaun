import { cva, VariantProps } from 'class-variance-authority';
import { FC, PropsWithChildren } from 'react';

import { cn } from '@primitives/lib/utils';

export type GridVariants = VariantProps<typeof gridVariants>;

const gridVariants = cva(
    ['grid'],
    {
        variants: {
            gap: {
                s: ['gap-1'],
                m: ['gap-2'],
                l: ['gap-3'],
                xl: ['gap-5'],
            },
            type: {
                // for GridSwitcher
                raw: [],
                column: ['grid-flow-col', 'auto-cols-min'],
                grid2: ['grid-cols-2'],
                grid3: ['grid-cols-3'],
                grid4: ['grid-cols-4'],
                grid5: ['grid-cols-5'],
            }
        },
        defaultVariants: {
            gap: 'm',
            type: 'raw',
        }
    }
)

interface Props extends GridVariants {
    className?: string
}

const Grid: FC<PropsWithChildren<Props>> = ({ className, gap, type, children }) => (
    <ul className={cn(className, gridVariants({ gap, type }))}>
        {children}
    </ul>
);

export default Grid;
