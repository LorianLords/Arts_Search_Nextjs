import React from 'react';
import styles from './Loading.module.css';
const Loading = () => {
  return (
    <div className={styles.loading} role="status" aria-label="Loading">
      <span className={styles.spinner} />
    </div>
  );
};

export default Loading;
