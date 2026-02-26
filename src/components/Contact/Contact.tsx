import { Typography } from '@mui/material';
import Page from 'components/Page/Page';
import FeedbackForm from 'components/forms/FeedbackForm/FeedbackForm';

const TITLE = 'Contact';

const Contact = () => {
  return (
    <Page title={TITLE} data-cy="contact">
      <Typography>Share Feedback</Typography>
      <FeedbackForm />
      {/* Have Socials Tabs here */}
    </Page>
  );
};

export default Contact;
