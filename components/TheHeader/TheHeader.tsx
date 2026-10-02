import styles from './TheHeader.module.css';
import { Navigation } from '@/components/TheHeader/Navigation/Navigation';
import React from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/TheHeader/ThemeToggle';

export const links = [
  { label: 'Collection', href: '/' },
  { label: 'About', href: '/about' },
];

const TheHeader = () => {
  return (
    <header className={styles.navBar}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand}>
          Arts <em>Search</em>
        </Link>
        <nav aria-label="Main">
          <ul>
            <Navigation navLinks={links} />
          </ul>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
};

export { TheHeader };
