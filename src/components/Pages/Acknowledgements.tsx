import styles from './Pages.module.scss';

// REVIEW: Checked around and this component is not being used. Maybe remove?
const Acknowledgements = () => (
  <div className={styles.page}>
    <h1 className={styles.pageHeader}>Acknowledgements</h1>
    <div>
      <p className={styles.pageText}>
        The PHLASK app has been created with the help of many Code for Philly
        volunteers, including:
      </p>
    </div>
  </div>
);

export default Acknowledgements;
