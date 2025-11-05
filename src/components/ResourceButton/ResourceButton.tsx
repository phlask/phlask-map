import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from './ResourceButton.module.scss';
import type { FunctionComponent, MouseEventHandler } from 'react';

type ResourceButtonProps = {
  icon: FunctionComponent<{ className: string; width: number; height: number }>;
  onClick: MouseEventHandler<HTMLButtonElement>;
  color: string;
  'data-cy': string;
  text: string;
};

const ResourceButton = ({
  icon: Icon,
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
      borderRadius: '8px'
    }}
    onClick={onClick}
    data-cy={dataCy}
  >
    <Stack alignItems="center">
      <Icon className={styles.icon} width={45} height={45} />
      <p className={styles.label}>{text}</p>
    </Stack>
  </Button>
);

export default ResourceButton;
