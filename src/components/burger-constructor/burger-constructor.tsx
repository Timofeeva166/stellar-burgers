import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { burgerConstructorSelectors } from '../../services/slices/burgerConstructorSlice';
import {
  clearOrder,
  createOrder,
  orderSelectors
} from '../../services/slices/orderSlice';
import { userSelectors } from '../../services/slices/userSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = useSelector(
    burgerConstructorSelectors.selectConstructor
  );
  const { bun, ingredients } = constructorItems;
  const orderRequest = useSelector(orderSelectors.selectIsLoading);
  const orderModalData = useSelector(orderSelectors.selectOrderData);
  const isAuthenticated = useSelector(userSelectors.selectIsAuthenticated);

  const onOrderClick = () => {
    if (!bun) return;

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      bun._id,
      ...ingredients.map((item) => item._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };
  const closeOrderModal = () => {
    dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
