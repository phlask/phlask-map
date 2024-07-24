import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Grid';
import { ReactComponent as CivicIcon } from '../icons/JoinCivicIcon.svg';
import { ReactComponent as DataIcon } from '../icons/JoinDataIcon.svg';
import { ReactComponent as DesignIcon } from '../icons/JoinDesignIcon.svg';
import { ReactComponent as DevelopementIcon } from '../icons/JoinDevelopmentIcon.svg';
import { ReactComponent as ManagementIcon } from '../icons/JoinManagementIcon.svg';
import { fetchContributors } from '../../reducers/contributors';
import styles from './Pages.module.scss';
import ContributorsList from '../ContributorsList/ContributorsList';

const Circle = props => {
  const Icon = props.icon;
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        aspectRatio: '1 / 1',
        textAlign: 'center'
      }}
    >
      <div
        style={{
          width: '150px',
          padding: '15px',
          backgroundColor: '#55C8FB6B',
          borderRadius: '50%',
          aspectRatio: '1 / 1'
        }}
      >
        <Icon style={{ height: '25px', marginBottom: '5px' }} />
        <h2
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600,
            fontSize: '16px',
            textAlign: 'center'
          }}
        >
          {props.title}
        </h2>
        <p
          style={{
            margin: 0,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '14px',
            textAlign: 'center'
          }}
        >
          {props.desc}
        </p>
      </div>
    </div>
  );
};

const Join = () => {
  const dispatch = useDispatch();
  const currentContributors = useSelector(state => state.contributors.current);
  const pastContributors = useSelector(state => state.contributors.past);

  useEffect(() => {
    dispatch(fetchContributors());
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <h1 className={styles.pageHeader} data-cy="jointeam-header">Join the team</h1>
      <div>
        <p className={styles.pageText}>
          PHLASK volunteers come from a wide array of socioeconomic, educational
          and technical backgrounds. The team is committed to non-hierarchical,
          collective self-management and shares a philosophy centered on
          transparency, sharing, and mentorship. PHLASK volunteers are grouped
          into &quot;circles&quot; by job function:
        </p>
      </div>
      <div
        style={{
          height: 'fit-content',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))'
        }}
      >
        <Circle
          icon={DevelopementIcon}
          title="Development"
          desc="Coding and Programming"
        />
        <Circle
          icon={DataIcon}
          title="Data"
          desc="Collecting and organizing app data"
        />
        <Circle
          icon={ManagementIcon}
          title="Project Management"
          desc="Task management"
        />
        <Circle
          icon={DesignIcon}
          title="Design"
          desc="UX/UI Design and Resarch"
        />
        <Circle
          icon={CivicIcon}
          title="Civic"
          desc="Publicity and Community Engagement"
        />
      </div>

      <div>
        <div
          style={{
            margin: '20px 0',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '55%',
              padding: '20px',
              border: '2px solid #F4D85B',
              borderRadius: '10px',
              boxShadow: '0px 3px 8px 0px #0000001C, 0px 2px 4px 0px #00000036'
            }}
          >
            <p className={styles.pageText} style={{ margin: 0 }}>
              New volunteers are always welcome, regardless of location. PHLASK
              meets every{' '}
              <span style={{ fontWeight: 700 }}>Tuesday at 6:30pm</span> ET. All
              meetings are virtual or hybrid; in-person attendance is not
              required.
            </p>
          </div>
        </div>
        <div>
          <p className={styles.pageText}>
            To join the team, visit{' '}
            <a href="https://codeforphilly.org/" className={styles.pageLink}>
              https://codeforphilly.org/
            </a>{' '}
            and follow these steps:
          </p>
          <ol className={styles.pageText}>
            <li>Click SIGN UP to create an account.</li>
            <li>
              Click CHAT (SLACK) to join the Code for Philly Slack workspace.
            </li>
            <li>
              Once you&apos;re in Slack, join the #phlask channel. Feeling lost?
              Try these tips or visit the #start-here channel.
            </li>
            <li>
              Attend part one of orientation: Code For Philly&apos;s hybrid hack
              night on the second Tuesday of the month. To attend remotely, see
              the #phlask channel for a meeting link. To attend in-person, RSVP{' '}
              <a
                href="https://www.meetup.com/code-for-philly/"
                className={styles.pageLink}
              >
                here
              </a>
              .
            </li>
            <li>
              Attend part two of orientation: PHLASK&apos;s virtual hack night
              on the third Tuesday of the month. A meeting link will be posted
              in the #phlask channel on the day of the event.
            </li>
          </ol>
        </div>
        <div id="acknowledgements-section">
          <h2>Acknowledgements</h2>
          <p>
            This project was made possible by the time, mentorship, and
            expertise of our dedicated team of volunteers.
          </p>
          <Grid container className="contributors" spacing={6}>
            <ContributorsList
              title="Current Contributors"
              items={currentContributors}
            />
            <ContributorsList
              title="Past Contributors"
              items={pastContributors}
            />
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Join;
