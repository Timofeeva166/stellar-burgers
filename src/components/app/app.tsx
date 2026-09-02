import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import { getUser } from '../../services/slices/userSlice';
import { AppHeader } from '@components';
import { routes, modalRoutes } from '../../routes';
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
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
};

export default App;
