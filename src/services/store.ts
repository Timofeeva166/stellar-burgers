import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import burgerConstructorReducer from './slices/burgerConstructorSlice';
import feedsReducer from './slices/feedsSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import orderReducer from './slices/orderSlice';
import ordersReducer from './slices/ordersSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer, // Конструктор бургера
  feeds: feedsReducer, // Лента заказов
  ingredients: ingredientsReducer, // Ингредиенты
  order: orderReducer, // Заказ
  orders: ordersReducer, // История заказов пользователя
  user: userReducer // Пользователь
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
