import FollowItem from './FollowItem';
import { FollowUser, FollowType, FollowActions } from '../types/FollowType.types';

interface FollowTabContentProps {
  users: FollowUser[];
  type: FollowType;
  actions: FollowActions;
  emptyMessage: string;
}

export default function FollowTabContent({
  users,
  type,
  actions,
  emptyMessage,
}: FollowTabContentProps) {
  return (
    <div className="flex items-center flex-col px-4 space-y-4 min-h-[400px]">
      {users.length === 0 ? (
        <p className="text-gray-400 mt-20">{emptyMessage}</p>
      ) : (
        users.map((user) => <FollowItem key={user.id} user={user} actions={actions} type={type} />)
      )}
    </div>
  );
}
