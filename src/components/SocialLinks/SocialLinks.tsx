import { Link, Stack, Typography } from '@mui/material';
import { SocialFacebook, SocialInstagram, SocialTwitter } from 'icons';

function SocialContacts() {
  return (
    <Stack direction={'column'} alignItems={'center'} gap={1}>
      <Typography variant="h6">Follow PHLASK</Typography>
      <Stack direction={'row'} gap={4}>
        <Link
          sx={theme => ({
            fontSize: theme.typography.pxToRem(48)
          })}
          href="https://www.facebook.com/PHLASKecosystem/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialFacebook />
        </Link>
        <Link
          sx={theme => ({
            fontSize: theme.typography.pxToRem(48)
          })}
          href="https://www.instagram.com/phlaskecosystem/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialInstagram />
        </Link>
        <Link
          sx={theme => ({
            fontSize: theme.typography.pxToRem(48)
          })}
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          <SocialTwitter />
        </Link>
      </Stack>
    </Stack>
  );
}

export default SocialContacts;
