"use client"

import { ComponentProps, forwardRef } from "react";

import cn from "@shared/lib/cn";

interface Props extends ComponentProps<"input"> {
    error?: string
}

export const InputText = forwardRef<HTMLInputElement, Props>(({ className, type, error, ...props }, ref) => (
    <div>
        <input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
            )}
            ref={ref}
            {...props}
        />
        {error && <span>{error}</span>}
    </div>
));

InputText.displayName = "InputText";

export default InputText;
