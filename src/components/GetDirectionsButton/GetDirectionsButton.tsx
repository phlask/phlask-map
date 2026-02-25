import { Button } from '@mui/material';
import DirectionIcon from 'icons/ArrowElbowUpRight';

type GetDirectionsButtonProps = {
  latitude: number;
  longitude: number;
};

const GetDirectionsButton = ({
  latitude,
  longitude
}: GetDirectionsButtonProps) => (
  <Button
    href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
    target="_blank"
    variant="contained"
    disableElevation
    sx={{
      padding: '6px 20px 6px 25px',
      fontSize: 16,
      borderRadius: '8px',
      textTransform: 'none',
      backgroundColor: '#00A5EE',
      width: '150px'
    }}
    fullWidth={false}
    startIcon={<DirectionIcon />}
  >
    Directions
  </Button>
);

export default GetDirectionsButton;
