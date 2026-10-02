'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import style from './Card.module.css';
import { Thumbnail } from '@/types/types';

// Пропорции области под картину в карточке (ширина / высота), как в Card.module.css
const STAGE_RATIO = 4 / 5;

interface imageProps {
  id: number;
  image: string | null;
  title: string;
  thumbnail?: Thumbnail | null;
}
const ImageCard = ({ id, image, title, thumbnail }: imageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  if (!image || isFailed) {
    return (
      <div className={style.imageContainer}>
        <div className={style.stage}>
          <p className={style.noImage}>Image not available</p>
        </div>
      </div>
    );
  }

  const ratio =
    thumbnail?.width && thumbnail?.height ? thumbnail.width / thumbnail.height : 1;
  // Вписываем рамку в область целиком, не обрезая картину
  const width = ratio >= STAGE_RATIO ? 100 : (ratio / STAGE_RATIO) * 100;

  return (
    <div className={style.imageContainer}>
      <div className={style.stage}>
        <motion.div
          layoutId={`art-${id}`}
          className={style.frame}
          style={{
            aspectRatio: ratio,
            width: `${width}%`,
            backgroundImage: thumbnail?.lqip ? `url(${thumbnail.lqip})` : undefined,
          }}
        >
          <img
            src={image}
            className={`${style.cardImage} ${isLoaded ? style.loaded : ''}`}
            alt={thumbnail?.alt_text || title}
            loading="lazy"
            decoding="async"
            ref={(img) => {
              if (img?.complete && img.naturalWidth > 0) setIsLoaded(true);
            }}
            onLoad={() => setIsLoaded(true)}
            onError={() => setIsFailed(true)}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ImageCard;
