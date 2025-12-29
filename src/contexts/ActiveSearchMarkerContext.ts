import { createContext, useContext } from 'react';
import noop from 'utils/noop';

type ActiveSearchLocationContextValue = {
  activeSearchLocation: google.maps.LatLngLiteral | null;
  onChangeActiveSearchLocation: (
    value: google.maps.LatLngLiteral | null
  ) => void;
};

export const ActiveSearchLocationContext =
  createContext<ActiveSearchLocationContextValue>({
    activeSearchLocation: null,
    onChangeActiveSearchLocation: noop
  });

export const useActiveSearchLocationContext = () =>
  useContext(ActiveSearchLocationContext);
