import { Box, Stack, Typography } from '@mui/material';
import { useWalkingDurationQuery } from 'hooks/useWalkingDurationQuery';
import type { ResourceEntry } from 'types/ResourceEntry';
import UseMyLocationButton from 'components/UseMyLocationButton/UseMyLocationButton';

type EstimatedWalkingDurationProps = {
  selectedResource: ResourceEntry;
};

const EstimatedWalkingDuration = ({
  selectedResource
}: EstimatedWalkingDurationProps) => {
  const {
    data: walkingDuration = null,
    isPending,
    refetch
  } = useWalkingDurationQuery({ selectedResource });

  if (isPending) {
    <Typography color="#60718C" fontSize={14} fontWeight={400}>
      Calculating walking duration...
    </Typography>;
  }

  return (
    <Box>
      <Stack direction="row" gap={1}>
        <Typography color="#60718C" fontSize={14} fontWeight={400}>
          Est. walking time:{' '}
        </Typography>
        <Typography
          fontSize={14}
          component="span"
          fontWeight={600}
          sx={{ color: '#2d3748' }}
        >
          {walkingDuration?.minutes
            ? `${walkingDuration.minutes} minutes from ${walkingDuration.from}`
            : 'Not Available'}
        </Typography>
      </Stack>
      {walkingDuration?.locationPermissionState === 'prompt' ? (
        <UseMyLocationButton
          // We refetch in both cases so that we can hide the button at the subsequent run
          onError={() => refetch()}
          onSuccess={() => refetch()}
        >
          Use my location
        </UseMyLocationButton>
      ) : null}
    </Box>
  );
};

export default EstimatedWalkingDuration;
