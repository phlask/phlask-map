import React from 'react';
import { ReactComponent as PhlaskIcon } from '../icons/PHLASK_v2.svg';
import styles from './Pages.module.scss';

const About = () => (
  <div className={styles.page}>
    <h1 className={styles.pageHeader} data-cy="about-header">About PHLASK</h1>
    <div>
      <h2 className={styles.pageSubheader}>What is PHLASK?</h2>
      <p className={styles.pageText}>
        PHLASK is an app that connects people in Philadelphia to free,
        life-sustaining resources. The interactive map shows users where to find
        food distribution sites, publicly accessible bathrooms and drinking
        water, and places to forage for edible plants.
      </p>
    </div>
    <div
      style={{
        margin: '0 22px 30px 22px',
        display: 'grid',
        gridTemplateColumns: '1fr 0.35fr 1fr 0.35fr 1.75fr',
        padding: '10px'
      }}
    >
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          border: '1px solid #10B6FF',
          borderRadius: '10px',
          boxShadow: '1px 1px 4px 0px #00000033'
        }}
      >
        <p
          style={{
            margin: '20px',
            color: '#10B6FF',
            fontFamily: "'Exo', sans-serif",
            fontSize: '32px'
          }}
        >
          PHL
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center'
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#60718C',
            fontFamily: "'Exo', sans-serif",
            fontSize: '40px'
          }}
        >
          +
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          backgroundColor: '#10B6FF',
          borderRadius: '10px',
          boxShadow: '1px 1px 4px 0px #00000033'
        }}
      >
        <p
          style={{
            margin: '20px',
            color: '#ffffff',
            fontFamily: "'Exo', sans-serif",
            fontSize: '32px'
          }}
        >
          ASK
        </p>
      </div>
      <div style={{ display: 'grid', placeItems: 'center' }}>
        <p
          style={{
            margin: 0,
            color: '#60718C',
            fontFamily: "'Exo', sans-serif",
            fontSize: '40px'
          }}
        >
          =
        </p>
      </div>
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          borderRadius: '10px',
          boxShadow: '1px 1px 4px 0px #00000033'
        }}
      >
        <PhlaskIcon />
      </div>
    </div>
    <div>
      <h2 className={styles.pageSubheader}>Mission</h2>
      <p className={styles.pageText}>
        Life-sustaining resources like food and water should be abundant, clean,
        and accessible to all.
        <br />
        <br />
        PHLASK&apos;s mission is to help people find publicly available
        resources, and to encourage private enterprises to provide free access
        to excess resources. Together, we can normalize resource-sharing and
        challenge enterprises who exploit the public commons for profit.
        <br />
        <br />
        Yes, PHLASK reduces waste by preventing food spoilage and encouraging
        the use of refillable water bottles. But it&apos;s even bigger than
        that: every time we use existing municipal infrastructure (e.g. public
        water fountains), the cost per use begins to shrink. This low-cost,
        high-benefit ratio makes the whole system more valuable to those
        responsible for its funding and maintenance. And that&apos;s good for
        everybody.
      </p>
      <div>
        <h2 className={styles.pageSubheader}>Our story</h2>
        <p>
          This app was officially launched in 2020 with support from Code for
          Philly. Conceived in 2017 as a Social Practice art project, PHLASK
          uses technology as an artistic medium to cultivate social cohesion and
          collective stewardship for environmental sustainability.
          <br />
          <br />
          PHLASK is 100% volunteer-run. Visit the &quot;Join the team&quot; tab
          to learn how you can help.
        </p>
      </div>
    </div>
  </div>
);

export default About;
