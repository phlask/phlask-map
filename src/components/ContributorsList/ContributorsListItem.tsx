import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Contributor } from 'types/Contributor';

type ContributorsListItemProps = {
  contributor: Contributor;
};

const ContributorsListItem = ({ contributor }: ContributorsListItemProps) => (
  <ListItem sx={{ paddingInline: 0 }}>
    <Stack>
      <Box>
        <Typography fontWeight={700}>
          {contributor.first_name} {contributor.last_name}
        </Typography>
      </Box>
      <Stack direction="row">
        <Typography component="span" variant="subtitle2">
          {contributor.circles.join(', ')}
        </Typography>
      </Stack>
    </Stack>
  </ListItem>
);

export default ContributorsListItem;
