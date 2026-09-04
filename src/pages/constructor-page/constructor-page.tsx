import { useSelector } from '../../services/store';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC } from 'react';
import { ingredientsSelectors } from '../../services/slices/ingredientsSlice';

export const ConstructorPage: FC = () => {
  const ingredients = useSelector(ingredientsSelectors.selectIngredients);
  const isLoading = useSelector(ingredientsSelectors.selectisLoading);
  const error = useSelector(ingredientsSelectors.selectError);

  if (isLoading) {
    return (
      <main className={styles.containerMain}>
        <Preloader />
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.containerMain}>
        <div data-testid='error' className={`text text_type_main-medium pt-4`}>
          {error}
        </div>
      </main>
    );
  }

  if (!ingredients.length) {
    return (
      <main className={styles.containerMain}>
        <div className={`text text_type_main-medium pt-4`}>
          Нет ингредиентов
        </div>
      </main>
    );
  }

  return (
    <main className={styles.containerMain}>
      <h1
        className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
      >
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};
