import { forwardRef, useId, useState } from 'react';
import { Box } from '@mui/material';

const Contact = () => (
  <Box sx={{ height: '600px' }}>
    <iframe
      title="Contact Us"
      className="airtable-embed"
      src="https://airtable.com/embed/appyNdhZZn3gpovFh/pagDtKnlb6n3mCpgd/form"
      width="100%"
      height="600px"
      style={{ background: 'transparent', border: 'none' }}
    />
  </Box>
);

export default Contact;
