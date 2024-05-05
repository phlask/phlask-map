import React from 'react';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ReactComponent as ConfirmationSuccess } from '../icons/ConfirmationSuccess.svg';
import { Modal, Box, Typography, Stack, Container } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

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
  theme.typography.h3 = {
    fontSize: '1.5rem',
    '@media (min-width;300px)': {
      fontSize: '1.5rem'
    },
    display: 'inline',
    [theme.breakpoints.up('md')]: {
      fontSize: '1.75rem'
    }
  };
  theme.typography.p = {
    fontSize: '1rem',
    '@media (min-width;360px)': {
      fontSize: '1rem'
    },
    display: 'inline',
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem'
    }
  };
  // theme.grid.img = {};

  return (
    <>
      <ThemeProvider theme={theme}>
        <Button variant="outlined" onClick={handleOpen}>
          Soy un Button
        </Button>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="Confirmation"
          aria-describedby="Confirmation"
        >
          <Grid
            container
            margin="auto"
            backgroundColor="white"
            width="30%"
            alignItems="center"
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
            {/* <Typography variant="p">
              Occaecat Lorem Lorem ipsum fugiat aliqua ut ad dolor ea
              exercitation esse mollit consequat.Occaecat Lorem Lorem ipsum
              fugiat aliqua ut ad dolor ea exercitation esse mollit consequat.
            </Typography> */}
            <Typography aria-label="Thanks for sharing!" variant="h3">
              Thanks for sharing!
            </Typography>
            <Typography
              sx={{ fontSize: 'h6.fontSize' }}
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
                Follow us and spread the news
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
              <ShareIcon aria-label="Share"></ShareIcon>

              <FacebookIcon aria-label="Facebook"></FacebookIcon>

              <InstagramIcon aria-label="Instagram"></InstagramIcon>

              <TwitterIcon aria-label="Twitter"></TwitterIcon>

              <GitHubIcon aria-label="Github"></GitHubIcon>
            </Grid>

            <Typography aria-label="Phlask" sx={{ mt: 2, mb: 2 }}>
              #PHLASK
            </Typography>
          </Grid>
        </Modal>
      </ThemeProvider>
    </>
  );
};

export default ConfirmationModal;
