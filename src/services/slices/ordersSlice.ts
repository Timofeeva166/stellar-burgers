import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi } from '@api';

//ИСТОРИЯ ЗАКАЗОВ

interface IOrdersState {
  orders: TOrder[];
  isOrdersLoading: boolean;
  error: string | undefined;
}

const initialState: IOrdersState = {
  orders: [],
  isOrdersLoading: false,
  error: undefined
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const data = await getOrdersApi();
  return data;
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isOrdersLoading = true;
        state.error = undefined;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isOrdersLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isOrdersLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectIsLoading: (state) => state.isOrdersLoading,
    selectError: (state) => state.error,
    selectOrdersCount: (state) => state.orders.length
  }
});

export const ordersSelectors = ordersSlice.selectors;
export default ordersSlice.reducer;
