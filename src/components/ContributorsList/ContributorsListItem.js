import React from 'react';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ContributorsListItem = ({ contributor }) => {
  return (
    <ListItem>
      <Stack>
        <Box>
          <Typography fontWeight={700}>
            {contributor.First} {contributor.Last} ({contributor.key})
          </Typography>
        </Box>
        {contributor.isConvener && (
          <Typography variant="subtitle2">Convener</Typography>
        )}
        <Typography variant="subtitle2">{contributor.circle} Circle</Typography>
      </Stack>
    </ListItem>
  );
};

export default ContributorsListItem;
