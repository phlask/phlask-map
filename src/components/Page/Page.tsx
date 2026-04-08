import type { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';

type PageProps = {
  children: ReactNode;
  title: string;
  'data-cy': string;
};

const Page = ({ children, title, 'data-cy': dataCy }: PageProps) => {
  return (
    <Stack
      sx={theme => ({
        color: '#60718c',
        overflowY: 'auto',
        width: '100%',
        gap: '2.5rem',
        maxHeight: '85vh',
        [theme.breakpoints.up('md')]: {
          maxHeight: '55vh'
        }
      })}
    >
      <Typography
        sx={{ fontWeight: 600, lineHeight: '30px', fontSize: 24 }}
        variant="h2"
        data-cy={dataCy}
      >
        {title}
      </Typography>
      <Stack sx={{ gap: '20px' }}>{children}</Stack>
    </Stack>
  );
};

export default Page;
