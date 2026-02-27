import { Stack, Typography } from '@mui/material';
import Connect from 'components/Connect/Connect';
import Page from 'components/Page/Page';
import SocialContacts from 'components/SocialContacts/SocialContacts';
import FeedbackForm from 'components/forms/FeedbackForm/FeedbackForm';

const TITLE = 'Contact';

const Contact = () => {
  return (
    <Page title={TITLE} data-cy="contact">
      <Typography variant="h6">Share Feedback</Typography>
      <FeedbackForm />
      <Stack direction={'row'} gap={10}>
        <SocialContacts />
        <Connect />
      </Stack>
    </Page>
  );
};

export default Contact;
