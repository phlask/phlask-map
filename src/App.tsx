import ReactGoogleMaps from 'components/ReactGoogleMaps/ReactGoogleMaps';

import Overlay from 'components/Overlay/Overlay';
import { useEffect, useState } from 'react';
import { getResources } from 'actions/actions';
import useAppDispatch from 'hooks/useDispatch';

import './App.css';

const App = () => {
  const dispatch = useAppDispatch();
  const [searchedTap, setSearchedTap] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    dispatch(getResources());
  }, [dispatch]);

  return (
    <>
      <Overlay onSearch={location => setSearchedTap(location)} />
      <ReactGoogleMaps searchedTap={searchedTap} />
    </>
  );
};

export default App;
