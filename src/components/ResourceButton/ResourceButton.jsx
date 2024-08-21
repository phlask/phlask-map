import Button from '@mui/material/Button';
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
      margin: '12px',
      backgroundColor: color,
      '&:hover': { backgroundColor: color },
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '5px',
      placeItems: 'center',
      borderRadius: '8px'
    }}
    onClick={onClick}
    data-cy={dataCy}
  >
    <Icon className={styles.icon} width="45px" height="45px" />
    <p className={styles.label}>{text}</p>
  </Button>
);

export default ResourceButton;
