import React from 'react';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const contributorToCircleName = contributor => {
  const circles = [];
  if (contributor.civic_member) circles.push('Civic');
  if (contributor.data_member) circles.push('Data');
  if (contributor.design_member) circles.push('Design');
  if (contributor.development_member) circles.push('Development');
  if (contributor.project_management_member) circles.push('Project Management');
  return circles.join(', ');
};

const ContributorsListItem = ({ contributor }) => (
  <ListItem sx={{ paddingInline: 0 }}>
    <Stack>
      <Box>
        <Typography fontWeight={700}>
          {contributor.first_name} {contributor.last_name}
        </Typography>
      </Box>
      <Stack direction="row">
        <Typography component="span" variant="subtitle2">
          {contributorToCircleName(contributor)}
          {contributor.convener ? ', Convener' : ''}
        </Typography>
      </Stack>
    </Stack>
  </ListItem>
);

export default ContributorsListItem;
