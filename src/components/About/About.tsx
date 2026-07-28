import { Stack, Typography } from '@mui/material';
import Page from 'components/Page/Page';
import PhlaskNameVisualExplainer from 'components/PhlaskNameVisualExplainer/PhlaskNameVisualExplainer';
import type { ReactNode } from 'react';

type PageSectionProps = {
  title?: string | null;
  children: ReactNode;
};

const PageSection = ({ title = null, children }: PageSectionProps) => {
  return (
    <Stack sx={{ gap: '10px', color: '#2d3748' }}>
      {title ? (
        <Typography
          component="h3"
          sx={{ fontSize: 20, fontWeight: 500, lineHeight: '24px' }}
        >
          {title}
        </Typography>
      ) : null}
      <Typography sx={{ fontSize: 14, fontWeight: 500, lineHeight: '24px' }}>
        {children}
      </Typography>
    </Stack>
  );
};

const About = () => (
  <Page title="About PHLASK" data-cy="about">
    <PageSection title="What is PHLASK?">
      PHLASK is an app that connects people in Philadelphia to free,
      life-sustaining resources. The interactive map shows users where to find
      food distribution sites, publicly accessible bathrooms and drinking water,
      and places to forage for edible plants.
    </PageSection>
    <PhlaskNameVisualExplainer />
    <PageSection title="Mission">
      Life-sustaining resources like food and water should be abundant, clean,
      and accessible to all. PHLASK&apos;s mission is to help people find
      publicly available resources, and to encourage private enterprises to
      provide free access to excess resources. Together, we can normalize
      resource-sharing and challenge enterprises who exploit the public commons
      for profit. Yes, PHLASK reduces waste by preventing food spoilage and
      encouraging the use of refillable water bottles. But it&apos;s even bigger
      than that: every time we use existing municipal infrastructure (e.g.
      public water fountains), the cost per use begins to shrink. This low-cost,
      high-benefit ratio makes the whole system more valuable to those
      responsible for its funding and maintenance. And that&apos;s good for
      everybody.
    </PageSection>
    <PageSection title="Our story">
      This app was officially launched in 2020 with support from Code for
      Philly. Conceived in 2017 as a Social Practice art project, PHLASK uses
      technology as an artistic medium to cultivate social cohesion and
      collective stewardship for environmental sustainability. PHLASK is 100%
      volunteer-run. Visit the &quot;Join the team&quot; tab to learn how you
      can help.
    </PageSection>
  </Page>
);

export default About;
