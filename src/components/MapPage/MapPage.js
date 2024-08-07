import { useState } from 'react';
import ReactGoogleMaps from '../ReactGoogleMaps/ReactGoogleMaps';
import styles from './MapPage.module.scss';
import useIsMobile from 'hooks/useIsMobile';

export const MapPage = () => {
  return (
    <div className={styles.mapWrapper}>
      <ReactGoogleMaps />
    </div>
  );
};

export default MapPage;
