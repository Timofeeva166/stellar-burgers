import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { logoutUser } from '../../services/slices/userSlice';
import { ProfileMenuUI, Preloader } from '@ui';
import { userSelectors } from '../../services/slices/userSlice';

export const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLoading = useSelector(userSelectors.selectIsUserLoading);

  if (isLoading) {
    return <Preloader />;
  }

  const handleLogout = () => {
    dispatch(logoutUser())
      .unwrap()
      .then(() => navigate('/login', { replace: true }))
      .catch((err) => {
        console.error(err);
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
