'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../TheHeader.module.css';
import React from 'react';
type NavLink = {
  label: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};
const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const part = 20;

  if (typeof window !== 'undefined') {
    const search = localStorage.getItem('searchText');
    const page = localStorage.getItem('page');
    if (search) {
      navLinks[0].href = `/?page=${page}&search=${search}`;
    }
  }
  console.log(part);
  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.label}>
            <Link
              key={link.label}
              href={link.href}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export { Navigation };
