import React from 'react';
import { Box, TextField } from '@mui/material';
import styles from '../Pages/Pages.module.scss';

const Share = () => {
  return (
    <div className={styles.pageText}>
      <h2>Contact</h2>
      <Box
        component="form"
        autoComplete="off"
      >
        <h3>Share Feedback</h3>
        <TextField id="name" label="Name" variant="outlined" />
        <TextField id="email" label="Email" variant="outlined" />
        <TextField id="feedback" label="Feedback" variant="outlined" />
      </Box>
    </div>
  );
};

export default Share;
