import { forwardRef, useId, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';

const Contact = () => {
  const [loading, setLoading] = useState(true);

  const handleLoading = () => {
    setLoading(false);
  };

  return (
    <Box sx={{ height: '600px' }}>
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <iframe
        title="Contact Us"
        className="airtable-embed"
        src="https://airtable.com/embed/appyNdhZZn3gpovFh/pagDtKnlb6n3mCpgd/form"
        width="100%"
        height="600px"
        style={{ background: 'transparent', border: 'none' }}
        onLoad={handleLoading}
      />
    </Box>
  );
};

export default Contact;
