import { Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';

type FilterSectionProps = {
  label?: string;
  children: ReactNode;
};

const FilterSection = ({ label = 'Filter', children }: FilterSectionProps) => {
  return (
    <Stack gap={2}>
      <Typography>{label}</Typography>
      {children}
    </Stack>
  );
};

export default FilterSection;
