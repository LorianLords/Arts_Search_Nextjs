import React, { FC } from 'react';
import styles from './Card.module.css';
import { CardProps } from '@/types/types';
/*import defaultImg from '@/public/react.svg';
import placeholder from '@/public/placeholder.jpg';
import { useAppDispatch, useAppSelector } from '@/services/hooks';*/
/*import {
  setCardId,
  setIsBlocked,
  toggleIsDetailsOpen,
} from '../../state/DetailsCard/DetailsSlice.tsx';*/
/*import { logDOM } from '@testing-library/react';
import { useTheme } from '@/services/ThemeContext';
import { toggleCard } from '@/redux/CardListSlice/CardListSlice';*/
import Checkbox from '@/app/CardList/Card/Checkbox';
import ImageCard from '@/app/CardList/Card/ImageCard';

const Card: FC<CardProps> = (props: CardProps) => {
  //const navigate = useNavigate();
  //const [searchParams, setSearchParams] = useSearchParams();
  //
  //const page = searchParams.get('page');
  //const { isBlocked } = useAppSelector((state) => state.details);
  //const { selectedCards } = useAppSelector((state) => state.cardList);
  //const dispatch = useAppDispatch();

  /*const handleCardDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isBlocked) {
      navigate(`./card/${props.id}`);
      searchParams.set('page', page?.toString() || '1');
      setSearchParams(searchParams);
      dispatch(setCardId(props.id));

      setTimeout(() => {
        dispatch(toggleIsDetailsOpen(true));
      }, 200);
      e.stopPropagation();
    }
  };*/

  return (
    <div
      className={styles.card}
      /* onClick={handleCardDetails}*/
    >
      <Checkbox id={props.id} />
      {/*{!isLoaded && <img src={placeholder} alt="placeholder" />}*/}

      <ImageCard image={props.image} />
      <div className={styles.textBlock}>
        <h2>{props.title}</h2>
        <p>{props.date_display} y.</p>
        <p>{props.artist_display}</p>
      </div>
    </div>
  );
};

export default Card;
