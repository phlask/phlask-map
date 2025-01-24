import React from 'react';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const contributorToCircleName = contributor => {
  if (contributor.civic_member) return 'Civic';
  if (contributor.data_member) return 'Data';
  if (contributor.design_member) return 'Design';
  if (contributor.development_member) return 'Development';
  if (contributor.project_management_member) return 'Project Management';
  return 'Other';
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
