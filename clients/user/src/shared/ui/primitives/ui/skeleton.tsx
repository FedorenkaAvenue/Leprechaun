import { cva, VariantProps } from 'class-variance-authority'
import { FC, HTMLAttributes } from 'react'

import { cn } from '@primitives/lib/utils'

type Props = HTMLAttributes<HTMLDivElement> & VariantProps<typeof skeletonVariants>;

const skeletonVariants = cva(
    ['animate-pulse', 'rounded'],
    {
        variants: {
            type: {
                default: ['bg-muted-primary'],
                card: ['bg-muted-secondary'],
            }
        },
        defaultVariants: {
            type: 'default',
        }
    }
)

const Skeleton: FC<Props> = ({ className, type, ...props }) => (
    <div
        className={cn(skeletonVariants({ type }), className)}
        {...props}
    />
)

export { Skeleton }
