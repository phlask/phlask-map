import ReactGoogleMaps from 'components/ReactGoogleMaps/ReactGoogleMaps';

import Overlay from 'components/Overlay/Overlay';
import './App.scss';

const App = () => {
  return (
    <>
      <Overlay />
      <ReactGoogleMaps />
    </>
  );
};

export default App;
