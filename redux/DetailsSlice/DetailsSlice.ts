import { createSlice } from '@reduxjs/toolkit';
import { CardDetailProps } from '../../types/types';
//import { fetchCardDetails } from "../../services/apiService.ts";

export interface DetailsState {
  isDetailsOpen: true | false | 'first';
  cardId: string;
  detInfo: CardDetailProps | null;
  detLoading: boolean;
  isVisible: boolean;
  error: string | null | undefined;
  isBlocked: boolean;
}

const initialState: DetailsState = {
  isDetailsOpen: 'first',
  cardId: '',
  detInfo: null,
  detLoading: true,
  isVisible: false,
  error: null,
  isBlocked: false,
};

const DetailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    toggleIsDetailsOpen: (state, action) => {
      state.isDetailsOpen = action.payload;
    },
    setCardId: (state, action) => {
      state.cardId = action.payload;
    },
    setIsBlocked: (state, action) => {
      state.isBlocked = action.payload;
    },
  },
});

export const { toggleIsDetailsOpen, setCardId, setIsBlocked } = DetailsSlice.actions;
export default DetailsSlice.reducer;
