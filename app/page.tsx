import React from 'react';
import styles from './Home.module.css';
import Pagination from '@/components/Pagination/Pagination';
import CardList from '@/app/CardList/CardList';
import CardDetails from '@/components/CardDetails/CardDetails';
import { setSearch } from '@/redux/SearchSlice/SearchSlice';
import { useAppDispatch } from '@/services/hooks';

/*
type Params = {
  params: {
    search: string;
  };
};
*/

export default function Home() {
  // const dispatch = useAppDispatch();
  /* console.log('HOME');
  console.log(params.search);*/
  /*
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    console.log(params.get('search') || localStorage.getItem('searchText') || '');
    dispatch(setSearch(params.get('search') || localStorage.getItem('searchText') || ''));
  }
*/

  return (
    <div id={'content-container'} className={`${styles.content} `}>
      <CardList />
      <Pagination />
      <CardDetails />
    </div>
  );
}
