'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../TheHeader.module.css';
import React, { useEffect, useState } from 'react';
type NavLink = {
  label: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};
const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const [homeHref, setHomeHref] = useState('/');

  // Возврат к последнему поиску: читаем localStorage после гидрации
  useEffect(() => {
    const search = localStorage.getItem('searchText');
    const page = localStorage.getItem('page') || '1';
    setHomeHref(search ? `/?page=${page}&search=${encodeURIComponent(search)}` : '/');
  }, [pathname]);

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <li key={link.label}>
            <Link
              href={link.href === '/' ? homeHref : link.href}
              className={`${styles.link} ${isActive ? styles.active : ''}`}
              aria-current={isActive ? 'page' : undefined}
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
