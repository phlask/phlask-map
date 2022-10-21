import { useSelector } from 'react-redux';

export const useIsResourceMenuShown = () => {
  const resourceMenu = useSelector(state => state.isResourceMenuShown);
  return resourceMenu;
};
