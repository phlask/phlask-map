import { Grid, Stack, Typography } from '@mui/material';
import ContributorsList from 'components/ContributorsList/ContributorsList';
import useGetContributorsQuery from 'hooks/queries/useContributorsQuery';

const AcknowledgementsSection = () => {
  const { data } = useGetContributorsQuery();

  return (
    <Stack gap={2}>
      <Typography component="h3" sx={{ fontSize: 24 }}>
        Acknowledgements
      </Typography>
      <Typography sx={{ color: '#2d3748', fontSize: 14 }}>
        This project was made possible by the time, mentorship, and expertise of
        our dedicated team of volunteers.
      </Typography>
      <Grid container className="contributors" spacing={6}>
        <ContributorsList
          title="Current Contributors"
          items={data?.current ?? []}
        />
        <ContributorsList title="Past Contributors" items={data?.past ?? []} />
      </Grid>
    </Stack>
  );
};

export default AcknowledgementsSection;
