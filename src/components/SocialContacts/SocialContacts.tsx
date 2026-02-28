import { Link, Stack, Typography } from '@mui/material';
import FacebookIcon from 'icons/FacebookIcon';
import InstagramIcon from 'icons/InstagramIcon';
import TwitterIcon from 'icons/TwitterIcon';

function SocialContacts() {
  return (
    <Stack direction={'column'} alignItems={'center'} gap={1}>
      <Typography variant="h6">Follow PHLASK</Typography>
      <Stack direction={'row'} gap={4}>
        <Link href="https://www.facebook.com/PHLASKecosystem/">
          <FacebookIcon />
        </Link>
        <Link href="https://www.instagram.com/phlaskecosystem/">
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
