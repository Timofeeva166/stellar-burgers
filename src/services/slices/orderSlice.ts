import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurgerApi, TNewOrder } from '@api';

//ЗАКАЗ

interface IOrderState {
  orderData: TOrder | null;
  isOrderDataLoading: boolean;
  error: string | undefined;
}

const initialState: IOrderState = {
  orderData: null,
  isOrderDataLoading: false,
  error: undefined
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const data = await orderBurgerApi(ingredients);
    return data.order as unknown as TOrder;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
      state.isOrderDataLoading = false;
      state.error = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isOrderDataLoading = true;
        state.error = undefined;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isOrderDataLoading = false;
        state.orderData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isOrderDataLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectOrderData: (state) => state.orderData,
    selectIsLoading: (state) => state.isOrderDataLoading,
    selectError: (state) => state.error
  }
});

export const { clearOrder } = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;
export default orderSlice.reducer;
