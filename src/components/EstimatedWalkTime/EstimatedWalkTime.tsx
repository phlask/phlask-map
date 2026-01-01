import { Typography } from '@mui/material';
import { useWalkingDurationQuery } from 'hooks/useWalkingDurationQuery';
import type { ResourceEntry } from 'types/ResourceEntry';

type EstimatedWalkingDurationProps = {
  selectedResource: ResourceEntry;
};

const EstimatedWalkingDuration = ({
  selectedResource
}: EstimatedWalkingDurationProps) => {
  const {
    data: walkingDuration = null,
    isPending,
    isUserSharingLocation
  } = useWalkingDurationQuery(selectedResource);

  if (!isUserSharingLocation)
    return (
      <Typography color="#60718C" fontSize={14} fontWeight={400}>
        Enable location services for est. walking time
      </Typography>
    );

  if (isPending) {
    <Typography color="#60718C" fontSize={14} fontWeight={400}>
      Calculating walking duration...
    </Typography>;
  }

  return (
    <Typography color="#60718C" fontSize={14} fontWeight={400}>
      Est. walking time:{' '}
      <Typography
        fontSize={14}
        component="span"
        fontWeight={600}
        sx={{ color: '#2d3748' }}
      >
        {walkingDuration ? `${walkingDuration} minutes` : 'Not Available'}
      </Typography>
    </Typography>
  );
};

export default EstimatedWalkingDuration;
