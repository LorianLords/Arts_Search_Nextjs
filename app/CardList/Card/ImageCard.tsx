import defaultImg from '@/public/react.svg';
import React, { useState } from 'react';
import placeholder from '@/public/placeholder.jpg';
import style from './Card.module.css';
import Image from 'next/image';

interface imageProps {
  image: string | null;
}
const ImageCard = ({ image }: imageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(image || defaultImg);
  console.log(image);
  return (
    <div className={style.imageContainer}>
      {!isLoaded && (
        <Image
          className={style.cardImage}
          src={placeholder}
          alt="placeholder"
          fill={true}
        />
      )}
      <Image
        src={imgSrc}
        className={style.cardImage}
        alt="picture"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsLoaded(false);
          setImgSrc(defaultImg);
        }}
        /*  style={{ display: isLoaded ? 'block' : 'none', objectFit: 'cover' }}*/
        fill={true}
        sizes={'(max-width: 500px) 100vw'}
        /* layout="fill" // Will size the image to fill the parent container
        objectFit="contain" // see - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
        objectPosition="center"*/
        /* placeholder={'blur'}
        blurDataURL={image || defaultImg}*/
      />
    </div>
  );
};

export default ImageCard;
