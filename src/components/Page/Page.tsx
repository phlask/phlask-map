import type { ReactNode } from 'react';
import { Stack, Typography } from '@mui/material';
import useIsMobile from 'hooks/useIsMobile';

type PageProps = {
  children: ReactNode;
  title: string;
  'data-cy': string;
};

const Page = ({ children, title, 'data-cy': dataCy }: PageProps) => {
  const isMobile = useIsMobile();
  return (
    <Stack
      sx={{
        color: '#60718c',
        maxHeight: isMobile ? '85vh' : '55vh',
        overflowY: 'auto',
        width: '100%',
        gap: '2.5rem'
      }}
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
