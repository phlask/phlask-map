import { Stack, Typography } from '@mui/material';
import type { PropsWithChildren } from 'react';

const FilterHeader = ({ children }: PropsWithChildren) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{
        background: '#60718C',
        paddingBlock: '20px'
      }}
    >
      <Typography
        color="#FAFAFA"
        fontSize={20}
        fontWeight={700}
        fontFamily="Inter"
      >
        {children}
      </Typography>
    </Stack>
  );
};

export default FilterHeader;
