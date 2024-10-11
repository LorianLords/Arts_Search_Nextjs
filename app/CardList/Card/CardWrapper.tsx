'use client';
import Card from '@/app/CardList/Card/Card';
import React from 'react';
import { CardProps } from '@/types/types';
import { useAppDispatch } from '@/services/hooks';
import { setCardId, toggleIsDetailsOpen } from '@/redux/DetailsSlice/DetailsSlice';
import styles from '@/app/CardList/Card/Card.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

type CardWrapperProps = {
  item: CardProps;
  key: number;
};

const CardWrapper = ({ item }: CardWrapperProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(toggleIsDetailsOpen(true));
    dispatch(setCardId(item.id));
    e.stopPropagation();

    const page = searchParams.get('page') || '1';
    const search = searchParams.get('search');
    if (search) router.push(`/?id=${item.id}&page=${page}&search=${search}`);
    else router.push(`/?id=${item.id}&page=${page}`);
  };

  return (
    <div onClick={handleCardClick} className={styles.cardWrapper}>
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        date_display={item.date_display}
        artist_display={item.artist_display}
        image={item.image}
        image_id={item.image_id}
      />
    </div>
  );
};

export default CardWrapper;
