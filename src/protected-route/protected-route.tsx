import React, { ReactElement } from 'react';
import { useSelector } from '../services/store';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { userSelectors } from '../services/slices/userSlice';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  onlyForAuthUser: boolean;
  children: ReactElement;
}

export const ProtectedRoute = ({
  onlyForAuthUser: onlyForAuthUser = true,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const isAuthenticated = useSelector(userSelectors.selectIsAuthenticated);
  const isUserLoading = useSelector(userSelectors.selectIsUserLoading);

  if (isUserLoading) {
    return <Preloader />;
  }

  if (!onlyForAuthUser && isAuthenticated) {
    //если авторизованный пользователь пытается зайти на страницы для неавторизованных, направляем на конструктор
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from} replace />;
  }

  if (onlyForAuthUser && !isAuthenticated) {
    //если неавторизованный пользователь пытается зайти на страницы для авторизованных, его перекидывает на логин
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  //в ином случае рендерим контент
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
