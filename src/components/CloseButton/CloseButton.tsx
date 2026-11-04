import type { MouseEventHandler } from 'react';
import { IconButton } from '@mui/material';
import { CloseIcon } from 'icons';

type CloseButtonProps = {
  color: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const CloseButton = ({ color, onClick }: CloseButtonProps) => (
  <IconButton
    aria-label="close"
    onClick={onClick}
    sx={{
      display: 'flex',
      position: 'absolute',
      color,
      fontSize: '24px',
      right: '25px'
    }}
  >
    <CloseIcon />
  </IconButton>
);

export default CloseButton;
