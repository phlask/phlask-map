import type { ReactNode } from 'react';
import CivicIcon from 'icons/JoinCivicIcon';
import DataIcon from 'icons/JoinDataIcon';
import DesignIcon from 'icons/JoinDesignIcon';
import DevelopmentIcon from 'icons/JoinDevelopmentIcon';
import ManagementIcon from 'icons/JoinManagementIcon';
import { Grid, Stack, SvgIcon, Typography } from '@mui/material';

type CircleProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

const Circle = ({ icon, title, description }: CircleProps) => (
  <Grid fontSize={2}>
    <Stack
      sx={{
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '150px',
        padding: '14px',
        backgroundColor: '#55C8FB6B',
        borderRadius: '50%',
        aspectRatio: '1 / 1',
        textAlign: 'center'
      }}
    >
      <Stack sx={{ alignItems: 'center', gap: 1 }}>
        <SvgIcon>{icon}</SvgIcon>
        <Typography
          sx={{
            color: '#000000de',
            fontWeight: 600,
            lineHeight: '20px',
            fontSize: 16
          }}
        >
          {title}
        </Typography>
      </Stack>
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '16px'
        }}
      >
        {description}
      </Typography>
    </Stack>
  </Grid>
);

const PhlaskCirclesExplainer = () => {
  return (
    <Grid gap={3} justifyContent="space-evenly" container>
      <Circle
        icon={<DevelopmentIcon />}
        title="Development"
        description="Coding and Programming"
      />
      <Circle
        icon={<DataIcon />}
        title="Data"
        description="Collecting and organizing app data"
      />
      <Circle
        icon={<ManagementIcon />}
        title="Project Management"
        description="Task management"
      />
      <Circle
        icon={<DesignIcon />}
        title="Design"
        description="UX/UI Design and Resarch"
      />
      <Circle
        icon={<CivicIcon />}
        title="Civic"
        description="Publicity and Community Engagement"
      />
    </Grid>
  );
};

export default PhlaskCirclesExplainer;
