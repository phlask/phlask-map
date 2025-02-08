import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faGithub
} from '@fortawesome/free-brands-svg-icons';
import useIsMobile from 'hooks/useIsMobile';
import PhillySkyline from 'icons/PhillySkyline';
import { Box, Link, Typography } from '@mui/material';

const ShareSocials = () => {
  const isMobile = useIsMobile();

  return isMobile ? (
    // MOBILE VIEW
    // This will be updated to 2.0 as a part of https://github.com/phlask/phlask-map/issues/341
    // Do not refer to these styles for use when working on this issue
    <Box>
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
      }}>
      You have successfully submitted a resource.
      </Typography>
      <Typography variant='h1'>
        Thanks for sharing‼
      </Typography>
      <Typography
        sx={{
          width: '389px',
          height: '24px',
          marginTop: '128px',

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
      }}>
        Follow us on social media:
      </Typography>
      <Box>
        <Link
          href="https://www.facebook.com/pg/PHLASKecosystem/community/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faFacebook} />
        </Link>
        <Link
          href="https://twitter.com/PHLASKecosystem"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
        <Link
          href="https://www.instagram.com/phlaskecosystem/?hl=en"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Link>
        <Link
          href="https://github.com/phlask/phlask-map"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faGithub} />
        </Link>
      </Box>
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
      }}>
        #phlask
      </Typography>
    </Box>
  ):
  // DESKTOP VIEW
  (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '419px',
        gap: '20px'
      }}>
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
      }}>
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
      }}>
        You should see your site pop up on the map in a few days
      </Typography>
    </Box>
  );
}

export default ShareSocials;
