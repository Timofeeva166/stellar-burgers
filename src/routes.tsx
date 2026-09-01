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
import { IngredientDetails, OrderInfo, Modal } from '@components';

export const authRoutes: RouteObject[] = [
  {
    path: '/profile',
    element: (
      <ProtectedRoute onlyForAuthUser>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile/orders',
    element: (
      <ProtectedRoute onlyForAuthUser>
        <ProfileOrders />
      </ProtectedRoute>
    )
  },
  {
    path: '/profile/orders/:number',
    element: (
      <ProtectedRoute onlyForAuthUser>
        <OrderInfo />
      </ProtectedRoute>
    )
  }
];

export const unAuthRoutes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <ProtectedRoute onlyForAuthUser={false}>
        <Login />
      </ProtectedRoute>
    )
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute onlyForAuthUser={false}>
        <Register />
      </ProtectedRoute>
    )
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute onlyForAuthUser={false}>
        <ForgotPassword />
      </ProtectedRoute>
    )
  },
  {
    path: '/reset-password',
    element: (
      <ProtectedRoute onlyForAuthUser={false}>
        <ResetPassword />
      </ProtectedRoute>
    )
  }
];

export const modalRoutes: RouteObject[] = [
  {
    path: '/ingredients/:id',
    element: (
      <Modal title='Детали ингредиента' onClose={() => window.history.back()}>
        <IngredientDetails />
      </Modal>
    )
  },
  {
    path: '/feed/:number',
    element: (
      <Modal title='Детали заказа' onClose={() => window.history.back()}>
        <OrderInfo />
      </Modal>
    )
  },
  {
    path: '/profile/orders/:number',
    element: (
      <Modal title='Детали заказа' onClose={() => window.history.back()}>
        <OrderInfo />
      </Modal>
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
  },
  {
    path: '/feed/:number',
    element: <OrderInfo />
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
