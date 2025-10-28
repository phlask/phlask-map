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
    sx={theme => ({
      display: 'flex',
      position: 'absolute',
      color,
      fontSize: '32px',
      right: '32px',
      top: '25px',
      [theme.breakpoints.up('md')]: {
        right: '42px',
        top: '19px'
      }
    })}
  >
    <CloseIcon />
  </IconButton>
);

export default CloseButton;
