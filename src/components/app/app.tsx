import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { ingredientsSelectors } from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/userSlice';
import { Preloader } from '@ui';
import { AppHeader } from '@components';
import { routes, modalRoutes } from '../../routes';
import '../../index.css';
import styles from './app.module.css';
import { getCookie } from '../../utils/cookie';

const AppRoutes = () => {
  const location = useLocation();
  const background = location.state?.background;

  return (
    <>
      {/* Основные */}
      <Routes location={background || location}>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>

      {/* Модалки */}
      {background && (
        <Routes>
          {modalRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      )}
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(ingredientsSelectors.selectIngredients);
  const isLoading = useSelector(ingredientsSelectors.selectisLoading);
  const error = useSelector(ingredientsSelectors.selectError);

  useEffect(() => {
    dispatch(fetchIngredients());
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className={styles.app}>
        <AppHeader />
        {isLoading ? (
          <Preloader />
        ) : error ? (
          <div className={`${styles.error} text text_type_main-medium pt-4`}>
            {error}
          </div>
        ) : ingredients.length > 0 ? (
          <AppRoutes />
        ) : (
          <div className={`${styles.title} text text_type_main-medium pt-4`}>
            Нет ингредиентов
          </div>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
