import PhillySkyline from 'icons/PhillySkyline';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const AddResourceSuccessDesktop = ({ onClose }) => (
  <Box>
    <PhillySkyline width="258.5" height="225.37" />
    <Typography
      sx={{
        width: '389px',
        height: '24px',

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
        width: '389px',
        height: '24px',

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
  </Box>
);

export default AddResourceSuccessDesktop;
