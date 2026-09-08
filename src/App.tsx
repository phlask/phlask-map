import Map from 'components/Map/Map';
import { ToastContainer } from 'react-toastify';
import Overlay from 'components/Overlay/Overlay';
import './App.scss';
import { secondsToMilliseconds } from 'date-fns/secondsToMilliseconds';

const App = () => {
  return (
    <>
      <Overlay />
      <Map />
      <ToastContainer
        toastStyle={{ padding: 0, minHeight: 'unset' }}
        closeButton={false}
        hideProgressBar={true}
        autoClose={secondsToMilliseconds(3)}
      />
    </>
  );
};

export default App;
