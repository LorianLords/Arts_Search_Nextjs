import React from 'react';
import styles from '../page.module.css';

const About = () => {
  return (
    <div className={`container ${styles.textPage}`}>
      <p className={styles.overline}>About</p>
      <h1>
        A quiet way to browse a <em>great museum</em>
      </h1>
      <p>
        Arts Search is a study project for exploring the collection of the Art Institute
        of Chicago: search by artist, title or subject, open a work to read about it, and
        export the ones you select as a CSV file.
      </p>
      <p className={styles.muted}>
        Artwork data and images are provided by the{' '}
        <a href="https://api.artic.edu/docs/" target="_blank" rel="noreferrer">
          Art Institute of Chicago API
        </a>
        .
      </p>
    </div>
  );
};

export default About;
