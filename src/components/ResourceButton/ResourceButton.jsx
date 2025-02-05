import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import styles from './ResourceButton.module.scss';

const ResourceButton = ({
  icon: Icon,
  onClick,
  color,
  'data-cy': dataCy,
  text
}) => (
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
