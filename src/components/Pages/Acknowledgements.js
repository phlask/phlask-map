import React from 'react';
import { ReactComponent as PhlaskIcon } from '../icons/PHLASK_v2.svg';
import styles from './Pages.module.scss';

const Acknowledgements = () => (
  <div className={styles.page}>
    <h1 className={styles.pageHeader}>Acknowledgements</h1>
    <div>
      <p className={styles.pageText}>
      The PHLASK app has been created with the help of many Code for Philly volunteers, including:
      </p>
  </div>
  </div>
);

export default Acknowledgements; 