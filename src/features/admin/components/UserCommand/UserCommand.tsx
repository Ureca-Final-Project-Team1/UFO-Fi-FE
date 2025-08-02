import React from 'react';

import { Command, CommandInput } from '@/shared';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared';

interface UserCommandProps {
  search: string;
  setSearch: (v: string) => void;
  filterType: string;
  setFilterType: (v: string) => void;
}

const UserCommand: React.FC<UserCommandProps> = ({
  search,
  setSearch,
  filterType,
  setFilterType,
}) => {
  return (
    <div className="flex gap-2 items-center">
      <Select value={filterType} onValueChange={setFilterType}>
        <SelectTrigger className="w-32 text-black">
          <SelectValue placeholder="필터" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nickname">닉네임</SelectItem>
          <SelectItem value="name">이름</SelectItem>
          <SelectItem value="email">메일</SelectItem>
        </SelectContent>
      </Select>
      <Command className="w-48">
        <CommandInput placeholder="검색" value={search} onValueChange={setSearch} />
      </Command>
    </div>
  );
};

export default UserCommand;
