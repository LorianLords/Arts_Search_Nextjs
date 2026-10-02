'use client';
import Card from '@/app/CardList/Card/Card';
import React from 'react';
import { motion, Variants } from 'motion/react';
import { CardProps } from '@/types/types';
import { useAppDispatch } from '@/services/hooks';
import { setCardId, toggleIsDetailsOpen } from '@/redux/DetailsSlice/DetailsSlice';
import styles from '@/app/CardList/Card/Card.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

type CardWrapperProps = {
  item: CardProps;
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const CardWrapper = ({ item }: CardWrapperProps) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();

  const openDetails = () => {
    dispatch(toggleIsDetailsOpen(true));
    dispatch(setCardId(item.id));

    const params = new URLSearchParams();
    params.set('id', item.id.toString());
    params.set('page', searchParams.get('page') || '1');
    const search = searchParams.get('search');
    if (search) params.set('search', search);
    router.push(`/?${params.toString()}`);
  };

  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    openDetails();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openDetails();
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      className={styles.cardWrapper}
      role="button"
      tabIndex={0}
      aria-label={`${item.title}, open details`}
    >
      <Card
        id={item.id}
        title={item.title}
        date_display={item.date_display}
        artist_display={item.artist_display}
        image={item.image}
        image_id={item.image_id}
        thumbnail={item.thumbnail}
      />
    </motion.article>
  );
};

export default CardWrapper;
