import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import type { Contributor } from 'types/Contributor';
import ContributorsListItem from './ContributorsListItem';

type ContributorsListProps = {
  title: string;
  items: Contributor[];
};

const ContributorsList = ({
  title = 'Contributors',
  items = []
}: ContributorsListProps) => (
  <Grid>
    <Typography variant="h6" color="#73839E">
      {title}
    </Typography>
    <List>
      {items.map(contributor => (
        <ContributorsListItem key={contributor.id} contributor={contributor} />
      ))}
    </List>
  </Grid>
);

export default ContributorsList;
