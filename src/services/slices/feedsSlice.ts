import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

//ЛЕНТА ЗАКАЗОВ

interface IFeedState {
  feeds: TOrder[];
  total: number;
  today: number;
  isFeedsLoading: boolean;
  error: string | undefined;
}

const initialState: IFeedState = {
  feeds: [],
  total: 0,
  today: 0,
  isFeedsLoading: false,
  error: undefined
};

export const fetchFeeds = createAsyncThunk('feeds/fetchFeeds', async () => {
  const data = await getFeedsApi();
  return data;
});

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isFeedsLoading = true;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isFeedsLoading = false;
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.today = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isFeedsLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectFeeds: (state) => state.feeds,
    selectTotal: (state) => state.total,
    selectTotalToday: (state) => state.today,
    selectIsLoading: (state) => state.isFeedsLoading,
    selectError: (state) => state.error
  }
});

export const feedSelectors = feedsSlice.selectors;
export default feedsSlice.reducer;
