import { CardProps } from '@/types/types';

const API_URL = 'https://api.artic.edu/api/v1';

export const fetchImg = async (data: CardProps[]) => {
  return await Promise.all(
    data.map(async (artwork: CardProps) => {
      if (artwork.image_id != null) {
        const imageUrl = `/api/image/${artwork.image_id}`;

        return {
          ...artwork,
          image: imageUrl,
        };
      } else {
        return artwork;
      }
    }),
  );
};
