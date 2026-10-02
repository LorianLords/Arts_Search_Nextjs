'use client';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  decrementCurPage,
  incrementCurPage,
} from '@/redux/PaginationSlice/PaginationSlice';
import styles from './Pagination.module.css';
const Pagination = () => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { totalPages, currentPage } = useAppSelector((state) => state.pagination);
  const hasRun = useRef(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('page', currentPage.toString());
      replace(`${pathname}?${searchParams.toString()}`);
      localStorage.setItem('page', currentPage.toString());
    }
  }, [currentPage]);

  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  const scrollToList = () => {
    document
      .getElementById('content-container')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handlePrevious = () => {
    if (!isFirst) {
      dispatch(decrementCurPage());
      scrollToList();
    }
  };

  const handleNext = () => {
    if (!isLast) {
      dispatch(incrementCurPage());
      scrollToList();
    }
  };

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button className={styles.pagBtn} onClick={handlePrevious} disabled={isFirst}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M20 12H4M10 6l-6 6 6 6" />
        </svg>
        Previous
      </button>
      <span className={styles.pagText}>
        <b>{currentPage.toLocaleString('en-US')}</b> /{' '}
        {totalPages.toLocaleString('en-US')}
      </span>
      <button className={styles.pagBtn} onClick={handleNext} disabled={isLast}>
        Next
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 12h16M14 6l6 6-6 6" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
