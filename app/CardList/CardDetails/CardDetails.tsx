'use client';
import stylesInfo from './CardDetails.module.css';
import { useGetCardDetailsQuery } from '@/redux/Api/DetailsApi';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setCardId, toggleIsDetailsOpen } from '@/redux/DetailsSlice/DetailsSlice';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const EASE = [0.22, 1, 0.36, 1] as const;

const CardDetails = () => {
  const dispatch = useAppDispatch();
  const { cardId, isDetailsOpen } = useAppSelector((state) => state.details);
  // Карточка из списка уже загружена — берём из неё картинку, не дожидаясь деталей
  const card = useAppSelector((state) =>
    state.cardList.cardList.find((item) => String(item.id) === String(cardId)),
  );
  const { currentData: detInfo, isError } = useGetCardDetailsQuery(
    { cardId },
    { skip: !cardId },
  );
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [hiResId, setHiResId] = useState<string | null>(null);
  const [failedId, setFailedId] = useState<string | null>(null);

  const isOpen = isDetailsOpen === true && Boolean(cardId);

  useEffect(() => {
    const id = params.get('id');
    if (!isDetailsOpen && id) {
      const newParams = new URLSearchParams(params.toString());
      newParams.delete('id');
      router.push(pathname + '?' + newParams);
    }
    if (isDetailsOpen === 'first' && id) {
      dispatch(toggleIsDetailsOpen(true));
      dispatch(setCardId(id));
    }
  }, [isDetailsOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(toggleIsDetailsOpen(false));
    };
    document.addEventListener('keydown', handleKeyDown);
    document.documentElement.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.documentElement.style.overflow = '';
    };
  }, [isOpen, dispatch]);

  const handleBtnBack = () => {
    dispatch(toggleIsDetailsOpen(false));
  };

  const handleSideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const imageId = card?.image_id || detInfo?.image_id;
  const thumbnail = card?.thumbnail || detInfo?.thumbnail;
  const title = detInfo?.title || card?.title;
  const ratio =
    thumbnail?.width && thumbnail?.height ? thumbnail.width / thumbnail.height : 1;
  const overline = [detInfo?.place_of_origin, detInfo?.date_display]
    .filter(Boolean)
    .join(' · ');
  const description = detInfo?.short_description || detInfo?.description;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={stylesInfo.overlay} onClick={handleBtnBack} key="details">
          <motion.div
            className={stylesInfo.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
          <div
            className={stylesInfo.dialog}
            onClick={handleSideMenu}
            role="dialog"
            aria-modal="true"
            aria-label={title || 'Artwork details'}
          >
            <motion.div
              className={stylesInfo.panel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />

            <div className={stylesInfo.imageContainer}>
              {imageId && failedId !== imageId ? (
                <motion.div
                  layoutId={`art-${cardId}`}
                  className={stylesInfo.frame}
                  transition={{ duration: 0.65, ease: EASE }}
                  style={{
                    aspectRatio: ratio,
                    width: `min(100cqw, calc(100cqh * ${ratio}))`,
                    backgroundImage: thumbnail?.lqip
                      ? `url(${thumbnail.lqip})`
                      : undefined,
                  }}
                >
                  {/* Тот же файл, что в карточке: он уже в кэше и появляется сразу */}
                  <img
                    key={imageId}
                    src={`/api/image/${imageId}`}
                    alt={thumbnail?.alt_text || title || 'Artwork'}
                    onError={() => setFailedId(imageId)}
                  />
                  {/* Версия покрупнее проявляется поверх, когда догрузится */}
                  <img
                    key={`${imageId}-hires`}
                    src={`/api/image/${imageId}?w=1686`}
                    alt=""
                    className={`${stylesInfo.hiRes} ${hiResId === imageId ? stylesInfo.loaded : ''}`}
                    onLoad={() => setHiResId(imageId)}
                  />
                </motion.div>
              ) : (
                (imageId || detInfo || isError) && (
                  <p className={stylesInfo.noImage}>Image not available</p>
                )
              )}
            </div>

            <motion.div
              className={stylesInfo.container}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12, transition: { duration: 0.2, delay: 0 } }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
            >
              {overline && <p className={stylesInfo.overline}>{overline}</p>}
              {title && <h2>{title}</h2>}

              {isError && (
                <p className={stylesInfo.error}>
                  Could not load the details for this work. Please try again later.
                </p>
              )}

              {!detInfo && !isError && (
                <div className={stylesInfo.skeleton} aria-busy="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              )}

              {detInfo && (
                <>
                  {detInfo.artist_titles?.length > 0 && (
                    <p className={stylesInfo.artist}>
                      {detInfo.artist_titles.join(', ')}
                    </p>
                  )}
                  {description && (
                    <div
                      className={stylesInfo.description}
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  )}
                  <dl className={stylesInfo.meta}>
                    {detInfo.dimensions && (
                      <div>
                        <dt>Dimensions</dt>
                        <dd>{detInfo.dimensions}</dd>
                      </div>
                    )}
                    {detInfo.category_titles?.length > 0 && (
                      <div>
                        <dt>Categories</dt>
                        <dd>{detInfo.category_titles.join(', ')}</dd>
                      </div>
                    )}
                  </dl>
                  <a
                    className={stylesInfo.sourceLink}
                    href={`https://www.artic.edu/artworks/${cardId}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View on artic.edu
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                </>
              )}
            </motion.div>

            <motion.button
              ref={closeBtnRef}
              type="button"
              className={stylesInfo.backBtn}
              onClick={handleBtnBack}
              aria-label="Close details"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </motion.button>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CardDetails;
