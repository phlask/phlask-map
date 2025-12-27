import { Button, Stack } from '@mui/material';

const FilterActions = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        left: 0,
        bottom: 0,
        position: 'sticky',
        background: 'white'
      }}
    >
      <Button type="reset" data-cy="button-clear-all-mobile">
        Clear All
      </Button>
      <Button variant="outlined" type="submit">
        Apply
      </Button>
    </Stack>
  );
};

export default FilterActions;
