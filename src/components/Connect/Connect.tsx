import { Link, Stack, Typography } from '@mui/material';

function Connect() {
  return (
    <Stack direction={'column'} gap={3}>
      <Typography variant="h6">Connect</Typography>
      <Typography>
        For all other inquiries, email{' '}
        <Link href="mailto:phlaskecosystem@gmail.com">
          phlaskecosystem@gmail.com
        </Link>
      </Typography>
    </Stack>
  );
}

export default Connect;
