import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiResponse, CardProps, DataApi } from '@/types/types';
import removeDuplicates from '../../utils/RemoveDuplicates';
import { fetchImg } from '@/utils/apiService';
import { setTotalPages } from '../PaginationSlice/PaginationSlice';
import { setCardList } from '../CardListSlice/CardListSlice';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.artic.edu/api/v1' }),
  endpoints: (builder) => ({
    getCardList: builder.query<
      DataApi,
      { searchText: string | undefined; currentPage: number }
    >({
      query: ({ searchText, currentPage }) => {
        console.log(currentPage);
        const url = searchText ? '/artworks/search' : '/artworks';
        return {
          url,
          params: {
            q: searchText,
            fields: 'id,title,artist_display,date_display,image_id,thumbnail,pagination',
            limit: 10,
            page: currentPage || 1,
          },
        };
      },
      transformResponse: async (response: ApiResponse): Promise<DataApi> => {
        const data = removeDuplicates(response.data);
        const artworksWithImage = (await fetchImg(data)) as CardProps[];
        return {
          cards: artworksWithImage,
          total_pages: response.pagination.total_pages,
        };
      },
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setTotalPages(data.total_pages));
          dispatch(setCardList(data.cards));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useGetCardListQuery } = apiSlice;
