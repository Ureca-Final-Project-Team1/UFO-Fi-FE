import type { Meta, StoryObj } from '@storybook/nextjs';

import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
  CommandGroup,
  CommandSeparator,
  CommandShortcut,
} from './Command';

const meta: Meta<typeof CommandDialog> = {
  title: 'UI/Command',
  component: CommandDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '검색 기반 커맨드 팔레트(Dialog 기반)',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommandDialog>;

export const Default: Story = {
  render: () => (
    <CommandDialog open>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Help">
          <CommandItem>
            Documentation
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Command Dialog의 기본 예시입니다.',
      },
    },
  },
};
