import { Stack, Typography } from '@mui/material';
import { PhillySkyline } from 'icons';

const FeedbackFormSuccess = () => {
  return (
    <Stack
      sx={{
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        paddingBlock: '20px'
      }}
    >
      <Typography
        variant="h2" // @ts-expect-error Need to fix theme declaration
        sx={theme => ({ color: theme.palette.global.darkUI.darkGrey2 })}
      >
        Thank you for your feedback!
      </Typography>
      <Stack sx={{ width: '100%', paddingInline: '21px' }}>
        <PhillySkyline width="100%" height="306.02" />
      </Stack>
    </Stack>
  );
};

export default FeedbackFormSuccess;
