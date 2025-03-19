import PhillySkyline from 'icons/PhillySkyline';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const AddResourceSuccessDesktop = ({ onClose }) => (
  <Stack
    sx={{
      paddingBlock: '60px',
      alignItems: 'center',
      width: '100%',
      gap: '20px'
    }}
  >
    <PhillySkyline width="258.5" height="225.37" />
    <Typography
      sx={{
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 600,
        fontSize: '24.19px',
        lineHeight: '29px',
        textAlign: 'center',
        letterSpacing: '0.02em',

        color: '#60718C',

        flex: 'none',
        order: 1,
        flexGrow: 0
      }}
    >
      Thank you for your submission!
    </Typography>
    <Typography
      sx={{
        /* Type Scale/body1 */
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '24px',
        /* identical to box height, or 171% */
        textAlign: 'center',

        /* UI/UI-8 */
        color: '#60718C',

        /* Inside auto layout */
        flex: 'none',
        order: 2,
        flexGrow: 0
      }}
    >
      You should see your site pop up on the map in a few days
    </Typography>
  </Stack>
);

export default AddResourceSuccessDesktop;
