import { CardProps } from '@/types/types';

const removeDuplicates = (data: CardProps[]): CardProps[] => {
  const seenIds = new Set();
  return data.filter((item) => {
    const duplicate = seenIds.has(item.id);
    seenIds.add(item.id);
    return !duplicate;
  });
};

export default removeDuplicates;
