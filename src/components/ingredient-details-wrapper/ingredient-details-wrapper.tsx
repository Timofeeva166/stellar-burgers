import { FC } from 'react';
import { IngredientDetails } from '@components';
import styles from './ingredient-details-wrapper.module.css';

export const IngredientDetailsWrapper: FC = () => (
  <div className={styles.container}>
    <h2 className={`text text_type_main-large mt-10 mb-5`}>
      Детали ингредиента
    </h2>
    <IngredientDetails />
  </div>
);
