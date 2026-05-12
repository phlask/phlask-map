import { Stack } from '@mui/material';
import Page from 'components/Page/Page';
import FeedbackForm from 'components/forms/FeedbackForm/FeedbackForm';
import SocialLinks from 'components/SocialLinks/SocialLinks';
import EmailConnect from 'components/EmailConnect/EmailConnect';
import useIsMobile from 'hooks/useIsMobile';
import FeedbackFormSuccess from 'components/forms/FeedbackFromSuccess/FeedbackFormSuccess';
import useAddFeedbackMutation from 'hooks/mutations/useAddFeedbackMutation';
import SEO from 'components/SEO/SEO';

const TITLE = 'Contact';

const Contact = () => {
  const isMobile = useIsMobile();
  const {
    mutate: addFeedbackMutate,
    isPending,
    isSuccess
  } = useAddFeedbackMutation();

  return (
    <Page title={TITLE} data-cy="contact">
      <SEO
        title="Contact"
        description="Get in touch with the PHLASK team to provide feedback, report issues, or ask questions about our free resource ecosystem in Philadelphia."
        canonicalUrl="https://phlask.me/contact"
      />
      {isSuccess ? (
        <FeedbackFormSuccess />
      ) : (
        <FeedbackForm
          onSubmit={data => addFeedbackMutate(data)}
          isPending={isPending}
        />
      )}

      {(isMobile || isSuccess) && (
        <Stack
          gap={isMobile ? 2 : 8}
          alignItems={isMobile ? 'center' : 'start'}
          direction={isMobile ? 'column' : 'row'}
          sx={{
            width: '100%'
          }}
        >
          <SocialLinks />
          <EmailConnect />
        </Stack>
      )}
    </Page>
  );
};

export default Contact;
