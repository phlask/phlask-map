import ReactGoogleMaps from 'components/ReactGoogleMaps/ReactGoogleMaps';

import Overlay from 'components/Overlay/Overlay';
import { useState } from 'react';
import './App.css';

const App = () => {
  const [searchedTap, setSearchedTap] =
    useState<google.maps.LatLngLiteral | null>(null);

  return (
    <>
      <Overlay onSearch={location => setSearchedTap(location)} />
      <ReactGoogleMaps searchedTap={searchedTap} />
    </>
  );
};

export default App;
