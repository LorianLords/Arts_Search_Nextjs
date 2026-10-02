import React, { FC } from 'react';
import styles from './Card.module.css';
import { CardProps } from '@/types/types';
import Checkbox from '@/app/CardList/Card/Checkbox';
import ImageCard from '@/app/CardList/Card/ImageCard';

const Card: FC<CardProps> = (props: CardProps) => {
  // В artist_display после имени идут страна и годы жизни — с новой строки или в скобках
  const artist = props.artist_display?.split('\n')[0].replace(/\s*\(.*$/, '');

  return (
    <div className={styles.card}>
      <Checkbox id={props.id} title={props.title} />

      <ImageCard
        id={props.id}
        image={props.image}
        title={props.title}
        thumbnail={props.thumbnail}
      />
      <div className={styles.textBlock}>
        <h2>{props.title}</h2>
        {artist && <p className={styles.textBlockArtist}>{artist}</p>}
        {props.date_display && (
          <p className={styles.textBlockDate}>{props.date_display}</p>
        )}
      </div>
    </div>
  );
};

export default Card;
