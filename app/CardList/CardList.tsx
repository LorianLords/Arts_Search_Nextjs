'use client';
import React, { useEffect, useRef } from 'react';
import { motion, Variants } from 'motion/react';
import styles from './CarList.module.css';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { CardProps } from '@/types/types';
import { useGetCardListQuery } from '@/redux/Api/apiSlice';
import { useSearchParams } from 'next/navigation';
import { setCurrentPage } from '@/redux/PaginationSlice/PaginationSlice';
import CardWrapper from '@/app/CardList/Card/CardWrapper';
import { ErrorHandler } from '@/utils/ErrorHandler';
import { setSearch } from '@/redux/SearchSlice/SearchSlice';
import SuccessDownloading from '@/components/SuccessDownloading/SuccessDownloading';

const SKELETON_COUNT = 10;

const listVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const CardList = () => {
  const { searchText } = useAppSelector((state) => state.search);
  const { currentPage } = useAppSelector((state) => state.pagination);
  const { isSuccess } = useAppSelector((state) => state.cardList);
  const hasRun = useRef(false);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { isLoading, error, isFetching, data } = useGetCardListQuery(
    {
      searchText,
      currentPage,
    },
    { skip: typeof searchText === 'undefined' },
  );
  const cardList = data?.cards;

  useEffect(() => {
    if (!hasRun.current) {
      const page = parseInt(searchParams.get('page') || '1', 10);
      const search = searchParams.get('search');
      dispatch(setSearch(search === null ? '' : (search as string)));
      if (page) {
        dispatch(setCurrentPage(page));
      }
      hasRun.current = true;
    }
  }, []);

  if (error) {
    ErrorHandler(error);
  }

  // Пока поиск не прочитан из URL, запрос ещё не начат — тоже показываем скелетон
  if (isLoading || isFetching || typeof searchText === 'undefined') {
    return (
      <div className={styles.cardList} aria-busy="true" aria-label="Loading artworks">
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <div className={styles.skeleton} key={i}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonLine} />
            <div className={`${styles.skeletonLine} ${styles.short}`} />
          </div>
        ))}
      </div>
    );
  }

  if (!cardList || cardList.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No works found</h2>
        <p>
          {searchText
            ? `Nothing in the collection matches “${searchText}”. Try a different artist, title or subject.`
            : 'There is nothing to show on this page.'}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      key={`${searchText}-${currentPage}`}
      className={styles.cardList}
      variants={listVariants}
      initial="hidden"
      animate="show"
    >
      {cardList.map((item: CardProps) => (
        <CardWrapper item={item} key={item.id} />
      ))}
      {isSuccess && <SuccessDownloading />}
    </motion.div>
  );
};

export default CardList;
