import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import PhillySkyline from 'icons/PhillySkyline';
import {
  SocialFacebook,
  SocialGithub,
  SocialInstagram,
  SocialShare,
  SocialTwitter
} from 'icons';
import { IconButton } from '@mui/material';
import CloseButton from '../CloseButton/CloseButton';
import noop from 'utils/noop';

type AddResourceSuccessMobileProps = {
  onClose?: VoidFunction;
};

const getSupportsShare = () => {
  if (typeof navigator.canShare !== 'function') {
    return false;
  }

  return navigator.canShare();
};

const AddResourceSuccessMobile = ({
  onClose = noop
}: AddResourceSuccessMobileProps) => {
  const canShare = getSupportsShare();
  const onShare = () => {
    if (!canShare) {
      return;
    }

    navigator.share({
      title: 'PHLask',
      url: window.location.href,
      text: 'Happy PHLasking!'
    });
  };
  return (
    <Stack
      sx={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingBlock: '20px'
      }}
    >
      <CloseButton onClick={onClose} color="white" />
      <Stack sx={{ gap: '4px' }}>
        <Typography
          variant="h2"
          sx={theme => ({
            fontSize: theme.typography.pxToRem(24),
            fontWeight: 600,
            // @ts-expect-error Need to fix theme declaration
            color: theme.palette.global.darkUI.darkGrey3
          })}
        >
          Thanks for sharing!
        </Typography>
        <Typography
          variant="subtitle2"
          // @ts-expect-error Need to fix theme declaration
          sx={theme => ({ color: theme.palette.global.darkUI.darkGrey2 })}
        >
          Your submission is under review.
        </Typography>
      </Stack>
      <Stack sx={{ width: '100%', paddingInline: '21px' }}>
        <PhillySkyline width="100%" height="306.02" />
      </Stack>
      <Stack>
        <Stack sx={{ gap: '15px' }}>
          <Typography
            variant="body1"
            sx={theme => ({
              fontWeight: 600,
              // @ts-expect-error Need to fix theme declaration
              color: theme.palette.global.darkUI.darkGrey3
            })}
          >
            Follow us & Spread the News!
          </Typography>
          <Stack sx={{ gap: '10px' }}>
            <Stack
              direction="row"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px'
              }}
            >
              {canShare ? (
                <IconButton
                  sx={theme => ({
                    fontSize: theme.typography.pxToRem(24),
                    padding: 0
                  })}
                  onClick={onShare}
                >
                  <SocialShare />
                </IconButton>
              ) : null}
              <Link
                sx={theme => ({
                  fontSize: theme.typography.pxToRem(24),
                  display: 'flex'
                })}
                href="https://www.facebook.com/pg/PHLASKecosystem/community/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialFacebook />
              </Link>
              <Link
                sx={theme => ({
                  fontSize: theme.typography.pxToRem(24),
                  display: 'flex'
                })}
                href="https://www.instagram.com/phlaskecosystem/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialInstagram />
              </Link>
              <Link
                sx={theme => ({
                  fontSize: theme.typography.pxToRem(24),
                  display: 'flex'
                })}
                href="https://twitter.com/PHLASKecosystem"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialTwitter />
              </Link>

              <Link
                sx={theme => ({
                  fontSize: theme.typography.pxToRem(24),
                  display: 'flex'
                })}
                href="https://github.com/phlask/phlask-map"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialGithub />
              </Link>
            </Stack>
            <Typography>#phlask</Typography>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddResourceSuccessMobile;
