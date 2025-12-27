import { Grid } from '@mui/material';
import ContributorsList from 'components/ContributorsList/ContributorsList';
import useContributorsQuery from 'hooks/useContributorsQuery';

const AcknowledgementsSection = () => {
  const { data } = useContributorsQuery();

  return (
    <div id="acknowledgements-section">
      <h2>Acknowledgements</h2>
      <p>
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
