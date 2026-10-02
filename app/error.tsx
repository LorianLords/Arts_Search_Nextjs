'use client';

import React, { useEffect } from 'react';
import styles from './page.module.css';

const ErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className={`container ${styles.textPage}`}>
      <p className={styles.overline}>Error</p>
      <h1>
        Something went <em>wrong</em>
      </h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={styles.muted}>
        <i>{error.message}</i>
      </p>
      <button
        className={styles.action}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
};
export default ErrorPage;
