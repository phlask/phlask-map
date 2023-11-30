import React from 'react';
import Button from '@mui/material/Button';
import { Modal, Box, Typography, Stack, Container } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

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
        className="modal"
      >
        <Box
          sx={{
            margin: 'auto'
          }}
        >
          <Stack
            sx={{
              display: 'flex',
              text: 'center',
              width: 400,
              height: 600,
              pb: '25px',
              pt: '10px',
              bgcolor: 'white',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                flexDirection: 'column',
                display: 'flex',
                textAlign: 'center',
                mt: 6
              }}
            >
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
            </Box>
            <Box
              sx={{
                border: 2,
                width: '100%',
                height: '50%',
                mt: 3,
                mb: 3
              }}
            ></Box>
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
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
