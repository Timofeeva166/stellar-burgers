import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/ingredientsSlice';
import { feedSelectors } from '../../services/slices/feedsSlice';
import { ordersSelectors } from '../../services/slices/ordersSlice';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import { fetchOrders } from '../../services/slices/ordersSlice';

export const OrderInfo: FC = () => {
  const dispatch = useDispatch();
  const { number } = useParams<{ number: string }>();
  const orderNumber = Number(number);

  const ingredients = useSelector(ingredientsSelectors.selectIngredients);
  const feedOrder = useSelector(feedSelectors.selectFeeds).find(
    (order) => order.number === Number(number)
  );
  const userOrder = useSelector(ordersSelectors.selectOrders).find(
    (order) => order.number === Number(number)
  );
  const orderData = feedOrder || userOrder || null;

  useEffect(() => {
    if (!orderData && orderNumber) {
      dispatch(fetchFeeds());
      dispatch(fetchOrders());
    }
  }, [dispatch, orderData, orderNumber]);

  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
