import PhillySkyline from 'icons/PhillySkyline';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CloseButton from '../CloseButton/CloseButton';

type AddResourceSuccessDesktopProps = {
  onClose: VoidFunction;
};

const AddResourceSuccessDesktop = ({
  onClose
}: AddResourceSuccessDesktopProps) => (
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
        // @ts-expect-error Need to fix theme declaration
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
        // @ts-expect-error Need to fix theme declaration
        color: theme.palette.global.darkUI.darkGrey2
      })}
    >
      You should see your site pop up on the map in a few days
    </Typography>
  </Stack>
);

export default AddResourceSuccessDesktop;
