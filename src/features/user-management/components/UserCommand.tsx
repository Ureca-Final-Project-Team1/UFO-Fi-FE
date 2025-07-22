import React from 'react';

import { Command, CommandInput } from '@/shared/ui/Command/Command';

interface UserCommandProps {
  search: string;
  setSearch: (v: string) => void;
}

const UserCommand: React.FC<UserCommandProps> = ({ search, setSearch }) => {
  return (
    <Command>
      <CommandInput placeholder="검색" value={search} onValueChange={setSearch} />
    </Command>
  );
};

export default UserCommand;
