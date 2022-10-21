import { useSelector } from 'react-redux';

export const isResourceMenuShown = useSelector(
  state => state.isResourceMenuShown
);
