import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';

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
  title: 'UI/CommandDialog',
  component: CommandDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '검색 기반 커맨드 팔레트(Dialog 기반)',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommandDialog>;

// Command Dialog를 열기 위한 버튼이 있는 스토리
const DefaultStory = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4 p-8">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Open Command Palette
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => setOpen(false)}>
              Profile
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem onSelect={() => setOpen(false)}>
              Settings
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Help">
            <CommandItem onSelect={() => setOpen(false)}>
              Documentation
              <CommandShortcut>⌘D</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
};

export const Default: Story = {
  render: DefaultStory,
  parameters: {
    docs: {
      description: {
        story: 'Command Dialog의 기본 예시입니다. 버튼을 클릭하여 다이얼로그를 열 수 있습니다.',
      },
    },
  },
};

// 항상 열려있는 상태의 스토리 (개발용)
const AlwaysOpenStory = () => (
  <div className="w-full max-w-md p-8">
    <CommandDialog open>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => {}}>
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => {}}>
            Settings
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Help">
          <CommandItem onSelect={() => {}}>
            Documentation
            <CommandShortcut>⌘D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  </div>
);

export const AlwaysOpen: Story = {
  render: AlwaysOpenStory,
  parameters: {
    docs: {
      description: {
        story: '개발 및 테스트용으로 항상 열려있는 Command Dialog입니다.',
      },
    },
  },
};
