import { Box, Link, List, ListItem, Stack, Typography } from '@mui/material';

import Page from 'components/Page/Page';
import PhlaskCirclesExplainer from 'components/PhlaskCircleExplainer/PhlaskCirclesExplainer';
import AcknowledgementsSection from 'components/AcknowledgementsSection/AcknowledgementsSection';

const JoinTheTeam = () => {
  return (
    <Page title="Join the team" data-cy="join-team">
      <Stack sx={{ color: '#2d3748', fontSize: 14, lineHeight: '24px' }}>
        PHLASK volunteers come from a wide array of socioeconomic, educational
        and technical backgrounds. The team is committed to non-hierarchical,
        collective self-management and shares a philosophy centered on
        transparency, sharing, and mentorship. PHLASK volunteers are grouped
        into &quot;circles&quot; by job function:
      </Stack>
      <PhlaskCirclesExplainer />
      <Stack direction="row" sx={{ justifyContent: 'center' }}>
        <Box
          sx={{
            maxWidth: { sx: 'unset', md: '55%' },
            padding: '20px',
            border: '2px solid #F4D85B',
            borderRadius: '10px',
            boxShadow: '0px 3px 8px 0px #0000001C, 0px 2px 4px 0px #00000036'
          }}
        >
          <Typography
            sx={{ fontSize: 14, fontWeight: 500, lineHeight: '24px' }}
          >
            New volunteers are always welcome, regardless of location. PHLASK
            meets every{' '}
            <span style={{ fontWeight: 700 }}>Tuesday at 6:30pm</span> ET. All
            meetings are virtual or hybrid; in-person attendance is not
            required.
          </Typography>
        </Box>
      </Stack>
      <Stack>
        <Typography sx={{ color: '#2d3748', fontSize: 14, lineHeight: '24px' }}>
          To join the team, visit{' '}
          <Link sx={{ color: '#033e8c' }} href="https://codeforphilly.org/">
            Code For Philly
          </Link>{' '}
          and follow these steps:
        </Typography>
        <List
          sx={{
            listStyle: 'decimal',
            paddingInlineStart: 4,
            fontSize: 14,
            lineHeight: '24px',
            fontWeight: 500,
            color: '#2d3748'
          }}
        >
          <ListItem sx={{ display: 'list-item' }}>
            Click SIGN UP to create an account.
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            Click CHAT (SLACK) to join the Code for Philly Slack workspace.
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            Once you&apos;re in Slack, join the #phlask channel. Feeling lost?
            Try these tips or visit the #start-here channel.
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            Attend part one of orientation: Code For Philly&apos;s hybrid hack
            night on the second Tuesday of the month. To attend remotely, see
            the #phlask channel for a meeting link. To attend in-person, RSVP{' '}
            <Link
              href="https://www.meetup.com/code-for-philly/"
              sx={{ color: '#033e8c' }}
            >
              here
            </Link>
            .
          </ListItem>
          <ListItem sx={{ display: 'list-item' }}>
            Attend part two of orientation: PHLASK&apos;s virtual hack night on
            the third Tuesday of the month. A meeting link will be posted in the
            #phlask channel on the day of the event.
          </ListItem>
        </List>
      </Stack>
      <AcknowledgementsSection />
    </Page>
  );
};

export default JoinTheTeam;
