import React, { ReactElement } from 'react';
import { useSelector } from '../services/store';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { userSelectors } from '../services/slices/userSlice';
import { Preloader } from '@ui';

interface ProtectedRouteProps {
  authenticated: boolean;
  children: ReactElement;
}

export const ProtectedRoute = ({
  authenticated = true,
  children
}: ProtectedRouteProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isAuthenticated = useSelector(userSelectors.selectIsAuthenticated);
  const isUserLoading = useSelector(userSelectors.selectIsUserLoading);

  const from = location.state?.from || '/';

  if (isUserLoading) {
    return <Preloader />;
  }

  if (authenticated) {
    if (!isAuthenticated) {
      navigate('/login', {
        state: { from: location },
        replace: true
      });
    }
    return children ? <>{children}</> : <Outlet />;
  }

  if (!authenticated) {
    if (isAuthenticated) {
      navigate(from, { replace: true });
      return null;
    }
    return children ? <>{children}</> : <Outlet />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
