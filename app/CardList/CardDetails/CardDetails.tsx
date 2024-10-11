'use client';
import stylesInfo from './CardDetails.module.css';
import Loading from '@/components/Loading';
import { useGetCardDetailsQuery } from '@/redux/Api/DetailsApi';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setCardId, toggleIsDetailsOpen } from '@/redux/DetailsSlice/DetailsSlice';
import React, { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

const CardDetails = () => {
  const dispatch = useAppDispatch();
  const { cardId, isDetailsOpen } = useAppSelector((state) => state.details);
  const {
    data: detInfo,
    isLoading,
    isFetching,
  } = useGetCardDetailsQuery({ cardId }, { skip: !cardId });
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    const id = params.get('id');
    if (!isDetailsOpen && id) {
      const newParams = new URLSearchParams(params.toString());
      newParams.delete('id');
      router.push(pathname + '?' + newParams);
    }
    if (isDetailsOpen === 'first' && id) {
      console.log('---------------------------------------');
      console.log(id);
      dispatch(toggleIsDetailsOpen(true));
      dispatch(setCardId(id));
    }
  }, [isDetailsOpen]);
  const handleBtnBack = () => {
    dispatch(toggleIsDetailsOpen(false));
  };

  const handleSideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div
      className={`${stylesInfo.sideDetails} ${isDetailsOpen === true && stylesInfo.open} `}
      onClick={handleSideMenu}
    >
      {isLoading || isFetching ? (
        <Loading />
      ) : (
        <div className={`${stylesInfo.container} `}>
          <div className={stylesInfo.imageContainer}>
            <img
              src={`https://www.artic.edu/iiif/2/${detInfo?.image_id}/full/450,/0/default.jpg`}
              alt="Art"
            />
          </div>
          <span>{detInfo?.dimensions}</span>
          <h1>{detInfo?.title}</h1>
          <p>
            {detInfo?.artist_titles[0]}, {detInfo?.date_display}
          </p>
          <p>{detInfo?.place_of_origin}</p>
          <p>{detInfo?.short_description || detInfo?.description}</p>
          <p>Categories: {detInfo?.category_titles.map((title) => title + ', ')}</p>

          <button className={stylesInfo.backBtn} onClick={handleBtnBack}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default CardDetails;
