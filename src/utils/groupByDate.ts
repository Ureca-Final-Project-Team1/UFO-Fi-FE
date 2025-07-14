export const formatDate = (date: Date): string => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const weekday = days[date.getDay()];
  return `${year}.${month}.${day} (${weekday})`;
};

export const groupByDate = <T extends { createdAt: Date }>(items: T[]) => {
  const groups: { [date: string]: T[] } = {};

  items.forEach((item) => {
    const formattedDate = formatDate(item.createdAt);
    if (!groups[formattedDate]) groups[formattedDate] = [];
    groups[formattedDate].push(item);
  });

  return groups;
};
