import { Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

const DividedButtonGroup = ({ children }: PropsWithChildren) => {
  return (
    <Stack flexWrap="wrap" direction="row" gap="8px">
      {children}
    </Stack>
  );
};

export default DividedButtonGroup;
