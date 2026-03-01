import { Link, Stack, Typography } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';

function Connect() {
  const isMobile = useIsMobile();
  return (
    <Stack direction={'column'} gap={1}>
      {!isMobile && <Typography variant="h6">Connect</Typography>}
      <Typography textAlign={isMobile ? 'center' : 'start'}>
        For all other inquiries, {isMobile && <br />}email{' '}
        <Link href="mailto:phlaskecosystem@gmail.com">
          phlaskecosystem@gmail.com
        </Link>
      </Typography>
    </Stack>
  );
}

export default Connect;
