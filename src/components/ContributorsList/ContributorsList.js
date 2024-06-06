import React from 'react';
import List from '@mui/material/List';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ContributorsListItem from './ContributorsListItem';

const ContributorsList = ({ items = [], title = 'Contributors' }) => {
  return (
    <Grid item>
      <Typography variant="h6" color="#73839E">
        {title}
      </Typography>
      <List>
        {items.map(contributor => (
          <ContributorsListItem
            key={contributor.key}
            contributor={contributor}
          />
        ))}
      </List>
    </Grid>
  );
};

export default ContributorsList;
