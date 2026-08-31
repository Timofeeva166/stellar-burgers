import { RouteObject } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { ProtectedRoute } from './protected-route/protected-route';
import { IngredientDetails } from '@components';

export const authRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: (
      <ProtectedRoute authenticated>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile/orders',
    element: (
      <ProtectedRoute authenticated>
        <ProfileOrders />
      </ProtectedRoute>
    )
  }
];

export const unAuthRoutes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <ProtectedRoute authenticated={false}>
        <Login />
      </ProtectedRoute>
    )
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute authenticated={false}>
        <Register />
      </ProtectedRoute>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute authenticated={false}>
        <ForgotPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/reset-password',
    element: (
      <ProtectedRoute authenticated={false}>
        <ResetPassword />
      </ProtectedRoute>
    )
  }
];

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ConstructorPage />
  },
  {
    path: '/feed',
    element: <Feed />
  },
  {
    path: '/ingredients/:id',
    element: <IngredientDetails />
  }
];

export const notFoundRoute: RouteObject = {
  path: '*',
  element: <NotFound404 />
};

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...unAuthRoutes,
  ...authRoutes,
  notFoundRoute
];

export default routes;
