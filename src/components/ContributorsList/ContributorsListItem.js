import React from 'react';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const ContributorsListItem = ({ contributor }) => {
  return (
    <ListItem sx={{ paddingInline: 0 }}>
      <Stack>
        <Box>
          <Typography fontWeight={700}>
            {contributor.First} {contributor.Last}
          </Typography>
        </Box>
        <Stack direction="row">
          <Typography component="span" variant="subtitle2">
            {contributor.circle}
          </Typography>
          {contributor.isConvener && (
            <Typography component="span" variant="subtitle2">
              , Convener
            </Typography>
          )}
        </Stack>
      </Stack>
    </ListItem>
  );
};

export default ContributorsListItem;
