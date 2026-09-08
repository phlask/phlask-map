import { ActiveSearchLocationContext } from 'contexts/ActiveSearchMarkerContext';
import { useState, type PropsWithChildren } from 'react';

const ActiveSearchLocationProvider = ({ children }: PropsWithChildren) => {
  const [activeSearchLocation, setActiveSearchLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  const onChangeActiveSearchLocation = (
    value: google.maps.LatLngLiteral | null
  ) => setActiveSearchLocation(value);

  return (
    <ActiveSearchLocationContext
      value={{ activeSearchLocation, onChangeActiveSearchLocation }}
    >
      {children}
    </ActiveSearchLocationContext>
  );
};

export default ActiveSearchLocationProvider;
