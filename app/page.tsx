import React, { Suspense } from 'react';
import styles from './Home.module.css';
import Search from '@/components/Search/Search';
import Pagination from '@/components/Pagination/Pagination';
import CardList from '@/app/CardList/CardList';
import CardDetails from '@/app/CardList/CardDetails/CardDetails';
import FooterPopup from '@/components/FooterPopup/FooterPopup';

export default function Home() {
  return (
    <Suspense>
      <Search />
      <div id={'content-container'} className={`container ${styles.content}`}>
        <CardList />
        <Pagination />
      </div>
      <CardDetails />
      <FooterPopup />
    </Suspense>
  );
}
