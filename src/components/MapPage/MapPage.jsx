import ReactGoogleMaps from '../ReactGoogleMaps/ReactGoogleMaps';
import styles from './MapPage.module.scss';

const MapPage = () => (
  <div className={styles.mapWrapper}>
    <ReactGoogleMaps />
  </div>
);

export default MapPage;
