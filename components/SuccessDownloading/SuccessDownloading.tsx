import styles from './SuccessDownloading.module.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setIsSuccess } from '@/redux/CardListSlice/CardListSlice';

const SuccessDownloading = () => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 100);
    setTimeout(() => {
      setIsVisible(false);
      dispatch(setIsSuccess(false));
    }, 2800);
  }, []);
  return (
    <div className={`${styles.alertSuccess} ${isVisible ? styles.success : ''}`}>
      <p>Downloading is success</p>
    </div>
  );
};

export default SuccessDownloading;
