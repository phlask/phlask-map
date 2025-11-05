import { Box, styled } from '@mui/material';

const CloseIconBar = styled(Box)({
  position: 'absolute',
  left: '4px',
  width: '24px',
  height: '2px',
  backgroundColor: '#2D3748',
  borderRadius: '1px',
  transitionDuration: '0.5s',
  transitionProperty: 'transform opacity'
});

type CloseIconProps = {
  close: boolean;
};

const CloseIcon = ({ close }: CloseIconProps) => (
  <Box
    sx={{
      position: 'relative',
      width: '32px',
      height: '32px'
    }}
  >
    <CloseIconBar
      sx={{
        top: '7px',
        transform: `translateY(${close ? 8 : 0}px) rotate(${close ? 45 : 0}deg)`
      }}
    />
    <CloseIconBar
      sx={{
        top: '15px',
        transform: `rotate(${close ? 45 : 0}deg)`,
        opacity: `${close ? 0 : 1}`
      }}
    />
    <CloseIconBar
      sx={{
        top: '23px',
        transform: `translateY(${close ? -8 : 0}px) rotate(${
          close ? -45 : 0
        }deg)`
      }}
    />
  </Box>
);

export default CloseIcon;
