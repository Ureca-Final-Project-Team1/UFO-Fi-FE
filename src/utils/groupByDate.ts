export const formatDate = (date: Date): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const weekday = days[date.getDay()];
  return `${year}.${month}.${day} (${weekday})`;
};

export const groupByDate = <T extends { createdAt: Date }>(items: T[]): Record<string, T[]> => {
  return items.reduce(
    (groups, item) => {
      const key = formatDate(item.createdAt);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    },
    {} as Record<string, T[]>,
  );
};
