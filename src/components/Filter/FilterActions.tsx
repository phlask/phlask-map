import { Button, Stack } from '@mui/material';
import useResourceType from 'hooks/useResourceType';

const FilterActions = () => {
  const { resourceType, setResourceType } = useResourceType();
  return (
    <Stack direction="row" justifyContent="space-between">
      <Button
        onClick={() => {
          setResourceType(resourceType);
        }}
        data-cy="button-clear-all-mobile"
      >
        Clear All
      </Button>
      <Button variant="outlined" type="submit">
        Apply
      </Button>
    </Stack>
  );
};

export default FilterActions;
