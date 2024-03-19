import React from 'react';
import Button from '@mui/material/Button';
import { ReactComponent as ConfirmationSuccess } from '../icons/ConfirmationSuccess.svg';
import { Modal, Box, Typography, Stack, Container } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
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

  return (
    <>
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
          flex-wrap="wrap"
          justifyContent="center"
          alignItems="center"
          spacing={6}
        >
          <Grid
            justifyContent="center"
            alignItems="center"
            sx={{
              pb: '25px',
              pt: '10px',
              bgcolor: 'white',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-evenly'
            }}
          >
            <Box
              sx={{
                mt: 6,
                display: 'flex',
                flexDirection: 'row-reverse'
              }}
            >
              <CloseIcon onClick={handleClose} />
            </Box>
            <Typography
              sx={{ fontWeight: 600, fontSize: 'h4.fontSize' }}
              aria-label="Thanks for sharing!"
            >
              Thanks for sharing!
            </Typography>
            <Typography
              sx={{ fontSize: 'h6.fontSize' }}
              aria-label="Your submission is under review."
            >
              Your submission is under review.
            </Typography>
            <Box
              sx={{
                component: 'img',
                width: '100%',
                height: '50%',
                mt: 3,
                mb: 3
              }}
            ></Box>
            <Box sx={{ margin: 'auto' }}>
              <ConfirmationSuccess />
            </Box>

            <Typography
              sx={{ fontSize: 16 }}
              aria-label="Follow us and spread the news"
            >
              Follow us and spread the news
            </Typography>

            <Container
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                width: '60%',
                mt: 2,
                mb: 2
              }}
            >
              <ShareIcon aria-label="Share"></ShareIcon>

              <FacebookIcon aria-label="Facebook"></FacebookIcon>

              <InstagramIcon aria-label="Instagram"></InstagramIcon>

              <TwitterIcon aria-label="Twitter"></TwitterIcon>

              <GitHubIcon aria-label="Github"></GitHubIcon>
            </Container>
            <Box sx={{ mt: 1, mb: 1 }}>
              <Typography aria-label="Phlask">#PHLASK</Typography>
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
