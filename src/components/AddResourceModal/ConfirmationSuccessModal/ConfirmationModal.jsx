import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as ConfirmationSuccess } from '../../icons/ConfirmationSuccess.svg';
import { Modal, Box, Typography, Link } from '@mui/material';
// import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid'; // Grid version 1

const ConfirmationModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const theme = createTheme();

  theme.typography.h1 = {
    '@media (min-width;300px)': {
      fontSize: '2rem'
    },
    display: 'inline',
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem'
    }
  };
  theme.typography.p = {
    '@media (min-width;300px)': {
      fontSize: '1.5rem'
    },
    display: 'inline',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.5rem'
    }
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid
          container
          margin="auto"
          backgroundColor="white"
          width="30%"
          justifyContent="center"
          textAlign={'center'}
        >
          <Grid container direction="row-reverse">
            <Grid
              item
              sx={{
                width: '20%',
                mt: 1,
                mb: 1
              }}
            >
              <CloseIcon onClick={handleClose} />
            </Grid>
          </Grid>
          <Typography
            aria-label="Thanks for sharing!"
            variant="h1"
            sx={{ ml: 2, mr: 2 }}
          >
            Thanks for sharing!
          </Typography>
          <Typography
            sx={{ fontSize: 'p.fontSize' }}
            aria-label="Your submission is under review."
          >
            Your submission is under review.
          </Typography>
          <ConfirmationSuccess />

          <Box>
            <Typography
              sx={{ fontSize: 16 }}
              aria-label="Follow us and spread the news"
            >
              Follow us and spread the news!
            </Typography>
          </Box>

          <Grid
            container
            sx={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
              mt: 2,
              mb: 2,
              ml: 3,
              mr: 3
            }}
          >
            {/* <ShareIcon aria-label="Share"></ShareIcon> */}

            <Link href="https://www.facebook.com/PHLASKecosystem/">
              <FacebookIcon
                aria-label="Facebook"
                sx={{ color: '#1877f2' }}
              ></FacebookIcon>
            </Link>

            <Link href="https://www.instagram.com/_phlask_/?hl=en">
              <InstagramIcon
                aria-label="Instagram"
                sx={{ color: '#c32aa3' }}
              ></InstagramIcon>
            </Link>

            <Link href="https://twitter.com/PHLASKecosystem">
              <TwitterIcon
                aria-label="Twitter"
                sx={{ color: '#1da1f2' }}
              ></TwitterIcon>
            </Link>

            <Link href="https://github.com/phlask">
              {' '}
              <GitHubIcon
                aria-label="Github"
                sx={{ color: '#000000' }}
              ></GitHubIcon>
            </Link>
          </Grid>

          <Typography aria-label="Phlask" sx={{ mt: 2, mb: 2 }}>
            #PHLASK
          </Typography>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default ConfirmationModal;
