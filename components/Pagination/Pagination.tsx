'use client';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useEffect, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import {
  decrementCurPage,
  incrementCurPage,
  setCurrentPage,
} from '@/redux/PaginationSlice/PaginationSlice';
import styles from './Pagination.module.css';
const Pagination = () => {
  //const [searchParams, setSearchParams] = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  //const searchParams = useSearchParams();
  const { totalPages, currentPage } = useAppSelector((state) => state.pagination);
  const { isDetailsOpen } = useAppSelector((state) => state.details);
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
      console.log('put', currentPage);
    }
  }, [currentPage]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(decrementCurPage());
    }
  };

  const handleNext = () => {
    if (currentPage <= totalPages) {
      dispatch(incrementCurPage());
    }
  };

  return (
    <div className={`${styles.pagination} ${isDetailsOpen === true && styles.openPanel}`}>
      <button className={styles.pagBtn} onClick={handlePrevious}>
        Previous
      </button>
      <span className={styles.pagText}>
        Page {currentPage} of {totalPages}
      </span>
      <button className={styles.pagBtn} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
