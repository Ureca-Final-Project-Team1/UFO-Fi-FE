import React from 'react';

import { Command, CommandInput } from '@/shared/ui/Command/Command';

const UserCommand: React.FC = () => {
  return (
    <Command>
      <CommandInput placeholder="검색" />
    </Command>
  );
};

export default UserCommand;
