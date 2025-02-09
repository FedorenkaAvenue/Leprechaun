import * as React from 'react'
import { cva, VariantProps } from 'class-variance-authority'

import { cn } from '@primitives/lib/utils'

const cardVariants = cva(
    ['p-4', 'bg-secondary', 'shadow-sm', 'rounded'],
    {
        variants: {
            size: {
                tiny: ['p-2'],
                medium: ['p-5'],
            },
        },
        defaultVariants: {
            size: 'medium',
        }
    }
);

export type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants> & {
    element?: React.ElementType
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, size, element, ...props }, ref) => {
    const Comp = element || 'div';

    return (
        <Comp
            ref={ref}
            className={cn(cardVariants({ size }), className)}
            {...props}
        />
    );
})
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5', className)}
        {...props}
    />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
        {...props}
    />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('text-sm text-muted-foreground', className)}
        {...props}
    />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
    />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
