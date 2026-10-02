import styles from './SuccessDownloading.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsSuccess } from '@/redux/CardListSlice/CardListSlice';

const SuccessDownloading = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2800);
    // Снимаем флаг после того, как уведомление успело скрыться
    const doneTimer = setTimeout(() => {
      dispatch(setIsSuccess(false));
    }, 3300);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(doneTimer);
    };
  }, []);
  return (
    <div
      className={`${styles.alertSuccess} ${isVisible ? styles.success : ''}`}
      role="status"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m5 12.5 4.5 4.5L19 7.5" />
      </svg>
      <p>CSV downloaded</p>
    </div>
  );
};

export default SuccessDownloading;
