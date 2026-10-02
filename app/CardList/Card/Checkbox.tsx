'use client';
import styles from '@/app/CardList/Card/Card.module.css';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { toggleCard } from '@/redux/CardListSlice/CardListSlice';

interface checkboxProps {
  id: number;
  title: string;
}

const Checkbox = ({ id, title }: checkboxProps) => {
  const { selectedCards } = useAppSelector((state) => state.cardList);
  const dispatch = useAppDispatch();
  const isChecked = selectedCards.includes(id.toString());
  const handleCheckboxChange = (id: number) => {
    dispatch(toggleCard(id.toString()));
  };

  return (
    <div
      className={`${styles.checkboxContainer} ${isChecked ? styles.checked : ''}`}
      onClick={(e) => {
        e.stopPropagation();
      }}
      onKeyDown={(e) => {
        e.stopPropagation();
      }}
    >
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isChecked}
        aria-label={`Select “${title}”`}
        onChange={() => handleCheckboxChange(id)}
      />
    </div>
  );
};

export default Checkbox;
