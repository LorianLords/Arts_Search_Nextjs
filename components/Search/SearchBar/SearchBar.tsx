'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setSearch } from '@/redux/SearchSlice/SearchSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setCurrentPage } from '@/redux/PaginationSlice/PaginationSlice';
import styles from '../Search.module.css';
const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.search);
  const [inputText, setInput] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setInput(searchText || '');
  }, [searchText]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === '') params.delete(name);
      else params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(
      pathname + '?' + createQueryString('search', inputText.trim().replace(/\s+/g, '_')),
    );
    dispatch(setSearch(inputText.trim()));
    dispatch(setCurrentPage(1));
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit} role="search">
      <svg
        className={styles.searchIcon}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
      <input
        type="search"
        value={inputText}
        className={styles.searchInput}
        placeholder={'Artist, title, subject…'}
        aria-label="Search the collection"
        onChange={handleChange}
      />
      <button type="submit" className={styles.searchButton}>
        Search
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
    </form>
  );
};

export default SearchBar;
