import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

const FilterContent = ({ children }: PropsWithChildren) => {
  return (
    <Stack padding="20px" flex={1} justifyContent="space-between">
      {children}
    </Stack>
  );
};

export default FilterContent;
