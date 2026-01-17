import { Grid } from '@mui/material';
import ContributorsList from 'components/ContributorsList/ContributorsList';
import useGetContributorsQuery from 'hooks/queries/useContributorsQuery';

import styles from '../Pages/Pages.module.scss';

const AcknowledgementsSection = () => {
  const { data } = useGetContributorsQuery();

  return (
    <div id="acknowledgements-section">
      <h2 className={styles.pageSubheader}>Acknowledgements</h2>
      <p className={styles.pageText}>
        This project was made possible by the time, mentorship, and expertise of
        our dedicated team of volunteers.
      </p>
      <Grid container className="contributors" spacing={6}>
        <ContributorsList
          title="Current Contributors"
          items={data?.current ?? []}
        />
        <ContributorsList title="Past Contributors" items={data?.past ?? []} />
      </Grid>
    </div>
  );
};

export default AcknowledgementsSection;
