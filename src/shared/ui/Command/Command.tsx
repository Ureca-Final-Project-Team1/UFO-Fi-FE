'use client';

import { Command as CommandPrimitive } from 'cmdk';

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
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandSeparatorProps,
  CommandItemProps,
  CommandShortcutProps,
} from './Command.types';
import {
  commandVariants,
  commandInputVariants,
  commandInputFieldVariants,
  commandListVariants,
  commandEmptyVariants,
  commandGroupVariants,
  commandSeparatorVariants,
  commandItemVariants,
  commandShortcutVariants,
} from './CommandVariants';

export function Command({ variant = 'default', className, ...props }: CommandProps) {
  return (
    <CommandPrimitive
      data-slot="command"
      className={cn(commandVariants({ variant }), className)}
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

export function CommandInput({ variant = 'default', className, ...props }: CommandInputProps) {
  return (
    <div
      data-slot="command-input-wrapper"
      className={cn(commandInputVariants({ variant }), className)}
    >
      <Icon name="Search" className="size-4 shrink-0 opacity-50" />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={cn(commandInputFieldVariants({ variant }))}
        {...props}
      />
    </div>
  );
}

export function CommandList({ variant = 'default', className, ...props }: CommandListProps) {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={cn(commandListVariants({ variant }), className)}
      {...props}
    />
  );
}

export function CommandEmpty({ variant = 'default', className, ...props }: CommandEmptyProps) {
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      className={cn(commandEmptyVariants({ variant }), className)}
      {...props}
    />
  );
}

export function CommandGroup({ variant = 'default', className, ...props }: CommandGroupProps) {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={cn(commandGroupVariants({ variant }), className)}
      {...props}
    />
  );
}

export function CommandSeparator({
  variant = 'default',
  className,
  ...props
}: CommandSeparatorProps) {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={cn(commandSeparatorVariants({ variant }), className)}
      {...props}
    />
  );
}

export function CommandItem({ variant = 'default', className, ...props }: CommandItemProps) {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={cn(commandItemVariants({ variant }), className)}
      {...props}
    />
  );
}

export function CommandShortcut({
  variant = 'default',
  className,
  ...props
}: CommandShortcutProps) {
  return (
    <span
      data-slot="command-shortcut"
      className={cn(commandShortcutVariants({ variant }), className)}
      {...props}
    />
  );
}
