import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

//ИНГРЕДИЕНТЫ

interface IIngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | undefined;
}

export const initialState: IIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: undefined
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const data = await getIngredientsApi();
    return data;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = undefined;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.ingredients = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = action.error.message;
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectBuns: (state) =>
      state.ingredients.filter((item) => item.type === 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((item) => item.type === 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((item) => item.type === 'sauce'),
    selectIngredientById: (state, id: string) =>
      state.ingredients.find((item) => item._id === id) || null,
    selectisLoading: (state) => state.isIngredientsLoading,
    selectError: (state) => state.error
  }
});

export const ingredientsSelectors = ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
