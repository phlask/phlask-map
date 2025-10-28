import PhillySkyline from 'icons/PhillySkyline';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseButton from '../CloseButton/CloseButton';

const AddResourceSuccessDesktop = ({ onClose }) => (
  <Stack
    sx={{
      paddingBlock: '60px',
      alignItems: 'center',
      width: '100%',
      gap: '20px'
    }}
  >
    <CloseButton onClick={onClose} color="white" />
    <PhillySkyline width="258.5" height="225.37" />
    <Typography
      sx={theme => ({
        fontWeight: 600,
        fontSize: theme.typography.pxToRem(24),
        lineHeight: '29px',
        textAlign: 'center',
        letterSpacing: '0.02em',
        color: theme.palette.global.darkUI.darkGrey2
      })}
    >
      Thank you for your submission!
    </Typography>
    <Typography
      sx={theme => ({
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(14),
        lineHeight: '24px',
        textAlign: 'center',
        color: theme.palette.global.darkUI.darkGrey2
      })}
    >
      You should see your site pop up on the map in a few days
    </Typography>
  </Stack>
);

export default AddResourceSuccessDesktop;
