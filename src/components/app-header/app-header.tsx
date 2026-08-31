import { FC } from 'react';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.selectUserName);

  return <AppHeaderUI userName={userName} />;
};
