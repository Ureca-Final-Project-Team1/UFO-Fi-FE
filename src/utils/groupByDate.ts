export const groupByDate = <T extends { createdAt: Date }>(items: T[]) => {
  const groups: { [date: string]: T[] } = {};

  items.forEach((item) => {
    const date = item.createdAt.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    if (!groups[date]) groups[date] = [];
    groups[date].push(item);
  });

  return groups;
};
