'use client';
import React, { useEffect, useState } from 'react';
import s from './FooterPopup.module.css';
import Papa from '@/lib/PapaParse-5.0.2';
import { clearSelection, setIsSuccess } from '@/redux/CardListSlice/CardListSlice';
import { CardProps } from '@/types/types';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
const FooterPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { selectedCards, cardList } = useAppSelector((state) => state.cardList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      if (selectedCards.length !== 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }, 100);

    console.log(cardList);
  }, [selectedCards]);

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

    console.log(csvData);

    const csv = Papa.unparse(csvData, {
      quotes: true, // Заключает строки в кавычки
      delimiter: ';', // Разделитель по умолчанию - запята
      header: true,
    });
    const csvWithBOM = '\uFEFF' + csv;
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
    <div className={`${s.popupContainer} ${isVisible ? s.visible : s.hidden}`}>
      <div className={s.popupWrapper}>
        <div className={s.checkCount}>
          <p>{selectedCards.length} items selected</p>
        </div>
        <div className={s.btnsContainer}>
          <button className={s.downBtn} onClick={handleDownload}>
            Download
          </button>
          <button className={s.cancelBtn} onClick={handleDeselect}>
            Deselect all
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterPopup;
