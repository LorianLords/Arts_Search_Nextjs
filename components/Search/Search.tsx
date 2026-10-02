import styles from './Search.module.css';
import SearchBar from '@/components/Search/SearchBar/SearchBar';

const Search = () => {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.overline}>Art Institute of Chicago</p>
        <h1 className={styles.title}>
          Explore the <em>collection</em>
        </h1>
        <SearchBar />
      </div>
    </section>
  );
};

export default Search;
