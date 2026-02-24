import { SvgIcon } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import type { MouseEventHandler, ReactNode } from 'react';

type ResourceButtonProps = {
  icon: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  color: string;
  'data-cy'?: string;
  text: string;
};

const ResourceButton = ({
  icon,
  onClick,
  color,
  'data-cy': dataCy,
  text
}: ResourceButtonProps) => (
  <Button
    sx={{
      backgroundColor: color,
      width: '100%',
      '&:hover': { backgroundColor: color },
      borderRadius: '8px',
      textTransform: 'none',
      fontSize: 20,
      color: 'common.white',
      fontWeight: 600,
      fontFamily: 'Inter',
      lineHeight: '23px',
    }}
    onClick={onClick}
    data-cy={dataCy}
  >
    <Stack alignItems="center">
      <SvgIcon sx={{ height: '45px', width: '45px' }}>
        {icon}
      </SvgIcon>
      {text}
    </Stack>
  </Button>
);

export default ResourceButton;
