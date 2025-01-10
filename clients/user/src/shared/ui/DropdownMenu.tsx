"use client"

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { Check, ChevronRight, Circle } from "lucide-react"
import { ComponentPropsWithoutRef, ElementRef, forwardRef, HTMLAttributes, ReactNode, useCallback, useState } from "react"
import { DialogProps } from "@radix-ui/react-dialog"

import cn from "@shared/lib/cn"
import Dialog from "./Dialog"

const Menu = DropdownMenuPrimitive.Root
const MenuTrigger = DropdownMenuPrimitive.Trigger
const MenuGroup = DropdownMenuPrimitive.Group
const MenuPortal = DropdownMenuPrimitive.Portal
const MenuSub = DropdownMenuPrimitive.Sub
const MenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const MenuSubTrigger = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
        inset?: boolean
    }
>(({ className, inset, children, ...props }, ref) => (
    <DropdownMenuPrimitive.SubTrigger
        ref={ref}
        className={cn(
            "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            inset && "pl-8",
            className
        )}
        {...props}
    >
        {children}
        <ChevronRight className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
))
MenuSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName

const MenuSubContent = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.SubContent>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.SubContent
        ref={ref}
        className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className
        )}
        {...props}
    />
))
MenuSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName

const MenuContent = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Content>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
                className
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
))
MenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const MenuItem = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Item>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
        inset?: boolean
    }
>(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            inset && "pl-8",
            className
        )}
        {...props}
    />
))
MenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const MenuCheckboxItem = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
    <DropdownMenuPrimitive.CheckboxItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        checked={checked}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Check className="h-4 w-4" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.CheckboxItem>
))
MenuCheckboxItem.displayName = DropdownMenuPrimitive.CheckboxItem.displayName

const MenuRadioItem = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.RadioItem
        ref={ref}
        className={cn(
            "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
            className
        )}
        {...props}
    >
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <DropdownMenuPrimitive.ItemIndicator>
                <Circle className="h-2 w-2 fill-current" />
            </DropdownMenuPrimitive.ItemIndicator>
        </span>
        {children}
    </DropdownMenuPrimitive.RadioItem>
))
MenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName

const MenuLabel = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Label>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
        inset?: boolean
    }
>(({ className, inset, ...props }, ref) => (
    <DropdownMenuPrimitive.Label
        ref={ref}
        className={cn(
            "px-2 py-1.5 text-sm font-semibold",
            inset && "pl-8",
            className
        )}
        {...props}
    />
))
MenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const MenuSeparator = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Separator>,
    ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <DropdownMenuPrimitive.Separator
        ref={ref}
        className={cn("-mx-1 my-1 h-px bg-muted", className)}
        {...props}
    />
))
MenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const MenuShortcut = ({ className, ...props }: HTMLAttributes<HTMLSpanElement>) => {
    return (
        <span
            className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
            {...props}
        />
    )
}
MenuShortcut.displayName = "DropdownMenuShortcut";

const MenuItemWishDialog = forwardRef<
    ElementRef<typeof DropdownMenuPrimitive.Item>,
    ComponentPropsWithoutRef<typeof MenuItem> & { dialog: ReactNode, onOpenChange?: DialogProps['onOpenChange'] }
>(({ dialog, children, onSelect, onOpenChange, ...itemProps }, ref) => {
    const [isOpen, setOpen] = useState(false);

    const selectMenuItem = useCallback((e: Event): void => {
        e.preventDefault();
        onSelect?.call(null, e);
        setOpen(() => true);
    }, [onSelect]);

    return (
        <Dialog.Root open={isOpen} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Dropdown.MenuItem
                    ref={ref}
                    onSelect={selectMenuItem}
                    {...itemProps}
                >
                    {children}
                </Dropdown.MenuItem>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay />
                {dialog}
            </Dialog.Portal>
        </Dialog.Root>
    );
});
MenuItemWishDialog.displayName = 'MenuItemWishDialog';

const Dropdown = {
    Menu, MenuTrigger, MenuContent, MenuItem, MenuCheckboxItem, MenuRadioItem, MenuLabel, MenuSeparator, MenuShortcut,
    MenuGroup, MenuPortal, MenuSub, MenuSubContent, MenuSubTrigger, MenuRadioGroup, MenuItemWishDialog,
};

export default Dropdown;
