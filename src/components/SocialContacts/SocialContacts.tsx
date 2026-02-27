import { Link, Stack, Typography } from '@mui/material';
import FacebookIcon from 'icons/FacebookIcon';
import InstagramIcon from 'icons/InstagramIcon';
import TwitterIcon from 'icons/TwitterIcon';

function SocialContacts() {
  return (
    <Stack direction={'column'} gap={3}>
      <Typography variant="h6">Follow PHLASK</Typography>
      <Stack direction={'row'} gap={5}>
        <Link href="">
          <FacebookIcon />
        </Link>
        <Link href="">
          <InstagramIcon />
        </Link>

        <Link href="">
          <TwitterIcon />
        </Link>
      </Stack>
    </Stack>
  );
}

export default SocialContacts;
