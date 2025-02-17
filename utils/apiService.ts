import { CardProps } from '@/types/types';

const API_URL = 'https://api.artic.edu/api/v1';
const API_IMG_URL = 'https://www.artic.edu/iiif/2';

export const fetchImg = async (data: CardProps[]) => {
  return await Promise.all(
    data.map(async (artwork: CardProps) => {
      if (artwork.image_id != null) {
        const imageUrl = API_IMG_URL + `/${artwork.image_id}/full/843,/0/default.jpg`;

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
