import React from 'react';
import Button from '@mui/material/Button';
import { Modal, Box, Typography, Stack, Container } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';

const TestModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="modal"
      >
        <Box>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: 600, fontSize: 'h4.fontSize' }}
            aria-label="Thanks for sharing!"
          >
            Thanks for sharing!
          </Typography>
          <Typography
            sx={{ fontSize: 16 }}
            aria-label="Follow us and spread the news"
          >
            Follow us and spread the news
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default TestModal;
