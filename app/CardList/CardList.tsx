'use client';
import React, { useEffect, useRef, useState } from 'react';
import Card from '@/app/CardList/Card/Card';
import styles from './CarList.module.css';
//import Loading.tsx from '../Loading.tsx.tsx';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { CardProps } from '@/types/types';
import { useGetCardListQuery } from '@/redux/Api/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import Loading from '@/components/Loading';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setCurrentPage } from '@/redux/PaginationSlice/PaginationSlice';
import CardWrapper from '@/app/CardList/Card/CardWrapper';
import { ErrorHandler } from '@/utils/ErrorHandler';
import { toggleIsDetailsOpen } from '@/redux/DetailsSlice/DetailsSlice';
import { setSearch } from '@/redux/SearchSlice/SearchSlice';
import CardDetails from '@/app/CardList/CardDetails/CardDetails';

const CardList = () => {
  const [handErr, setHandErr] = useState(false);
  const { searchText } = useAppSelector((state) => state.search);
  const { currentPage } = useAppSelector((state) => state.pagination);
  const { isDetailsOpen } = useAppSelector((state) => state.details);
  const hasRun = useRef(false);
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

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
  const errorHandle = () => {
    console.log('Error button clicked');
    setHandErr(true);
  };

  const sidePanelHandler = () => {
    dispatch(toggleIsDetailsOpen(false));
  };

  if (error) {
    ErrorHandler(error);
  }
  if (handErr) throw new Error('I crashed!');
  if (isLoading || isFetching) return <Loading />;

  if (!cardList || cardList.length === 0) {
    return (
      <div className="about">
        <h3>Sorry. There are no such pictures </h3>
      </div>
    );
  }

  return (
    <div
      className={`${styles.cardList} ${isDetailsOpen === true && styles.panelOpen}`}
      onClick={sidePanelHandler}
    >
      <button className={styles.errButton} onClick={errorHandle}>
        Error
      </button>
      {cardList.map((item: CardProps) => (
        <CardWrapper item={item} key={item.id} />
        /* <Card
            key={item.id}
            id={item.id}
            title={item.title}
            date_display={item.date_display}
            artist_display={item.artist_display}
            image={item.image}
            image_id={item.image_id}
          />*/
      ))}
    </div>
  );
};

export default CardList;
