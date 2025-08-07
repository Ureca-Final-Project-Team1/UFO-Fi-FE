'use client';

import { Command as CommandPrimitive } from 'cmdk';
import { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Icon,
} from '@/shared';

import {
  CommandDialogProps,
  CommandProps,
  CommandInputProps,
  CommandItemProps,
  CommandGroupProps,
  CommandListProps,
  CommandEmptyProps,
  CommandShortcutProps,
} from './Command.types';
import {
  commandVariants,
  commandInputVariants,
  commandItemVariants,
  commandGroupVariants,
  commandListVariants,
  commandEmptyVariants,
  commandShortcutVariants,
} from './commandVariant';

export function Command({ className, size, theme, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(commandVariants({ size, theme }), className)}
      {...props}
    />
  );
}

export function CommandDialog({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: CommandDialogProps) {
  return (
    <Dialog {...props}>
      <DialogHeader className="sr-only">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={cn('overflow-hidden p-0', className)}
        showCloseButton={showCloseButton}
      >
        <Command className="[&_[cmdk-group-heading]]:text-muted-foreground [&_[data-slot=command-input-wrapper]]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </Command>
      </DialogContent>
    </Dialog>
  );
}

export function CommandInput({ className, inputSize, variant, ...props }: CommandInputProps) {
  return (
    <div data-slot="command-input-wrapper" className="flex h-9 items-center gap-2 border-b px-3">
      <Icon name="Search" className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(commandInputVariants({ inputSize, variant }), className)}
        {...props}
      />
    </div>
  );
}

export function CommandList({ className, maxHeight, ...props }: CommandListProps) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(commandListVariants({ maxHeight }), className)}
      {...props}
    />
  );
}

export function CommandEmpty({ className, size, variant, ...props }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(commandEmptyVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export function CommandGroup({ className, spacing, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(commandGroupVariants({ spacing }), className)}
      {...props}
    />
  );
}

export function CommandSeparator({
  className,
  ...props
}: ComponentProps<typeof CommandPrimitive.Separator>) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn('bg-border -mx-1 h-px', className)}
      {...props}
    />
  );
}

export function CommandItem({ className, size, variant, ...props }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(commandItemVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export function CommandShortcut({ className, variant, ...props }: CommandShortcutProps) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(commandShortcutVariants({ variant }), className)}
      {...props}
    />
  );
}
