import { Box, Typography } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';
import CloseButton from './CloseButton/CloseButton';
import type { ReactNode } from 'react';
import noop from 'utils/noop';

type ResourceFormLayoutProps = {
  children: ReactNode;
  onClose?: VoidFunction;
  title?: string;
};

const ResourceFormLayout = ({
  title = 'Add Resource',
  children,
  onClose = noop
}: ResourceFormLayoutProps) => {
  const isMobile = useIsMobile();
  return (
    <Box justifyContent="center" overflow="none">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: isMobile ? 'flex-end' : 'center',
          justifyContent: isMobile ? null : 'center',
          padding: isMobile ? '0px 20px 10px' : '20px 0',
          height: isMobile ? '88px' : '64px',
          backgroundColor: '#5286E9',
          position: 'relative'
        }}
      >
        <Typography
          sx={{
            color: 'common.white',
            ...(isMobile
              ? {}
              : {
                  textAlign: 'center',
                  fontFamily: 'Inter',
                  fontWeight: 600,
                  fontSize: 20.16
                })
          }}
        >
          {title}
        </Typography>
        <CloseButton onClick={onClose} color="white" />
      </Box>
      <Box
        sx={{
          maxHeight: isMobile ? undefined : '500px',
          overflow: 'auto',
          padding: '20px'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ResourceFormLayout;
