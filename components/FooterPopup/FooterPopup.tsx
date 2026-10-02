'use client';
import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import s from './FooterPopup.module.css';
import Papa from '@/lib/PapaParse-5.0.2';
import { clearSelection, setIsSuccess } from '@/redux/CardListSlice/CardListSlice';
import { CardProps } from '@/types/types';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
const FooterPopup = () => {
  const { selectedCards, cardList } = useAppSelector((state) => state.cardList);
  const dispatch = useAppDispatch();
  const count = selectedCards.length;

  const handleDeselect = () => {
    dispatch(clearSelection());
  };

  const handleDownload = () => {
    if (selectedCards.length === 0) {
      return;
    }

    const csvData = cardList
      .filter((card: CardProps) => selectedCards.includes(card.id.toString()))
      .map((card: CardProps) => ({
        id: card.id,
        title: card.title,
        date: card.date_display,
        artist: card.artist_display,
        image: card.image,
      }));

    const csv = Papa.unparse(csvData, {
      quotes: true, // Заключает строки в кавычки
      delimiter: ';', // Разделитель по умолчанию - запята
      header: true,
    });
    const csvWithBOM = '﻿' + csv;
    const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const fileName = `${selectedCards.length}_arts.csv`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    dispatch(setIsSuccess(true));
  };
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          className={s.popupContainer}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
        >
          <div className={s.popupWrapper}>
            <p className={s.checkCount}>
              <b>{count}</b> {count === 1 ? 'work' : 'works'} selected
            </p>
            <div className={s.btnsContainer}>
              <button className={s.cancelBtn} onClick={handleDeselect}>
                Clear
              </button>
              <button className={s.downBtn} onClick={handleDownload}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
                </svg>
                Download CSV
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FooterPopup;
