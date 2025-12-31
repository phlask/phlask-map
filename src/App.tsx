import ReactGoogleMaps from 'components/ReactGoogleMaps/ReactGoogleMaps';

import Overlay from 'components/Overlay/Overlay';
import './App.css';

const App = () => {
  return (
    <>
      <ReactGoogleMaps />
      <Overlay />
    </>
  );
};

export default App;
