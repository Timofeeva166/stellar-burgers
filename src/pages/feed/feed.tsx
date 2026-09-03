import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchFeeds } from '../../services/slices/feedsSlice';
import { feedSelectors } from '../../services/slices/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  const orders = useSelector(feedSelectors.selectFeeds);
  const isLoading = useSelector(feedSelectors.selectIsLoading);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  if (!orders.length && isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchFeeds());
      }}
    />
  );
};
