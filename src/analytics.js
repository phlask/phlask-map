import ReactGA from 'react-ga4';

const trackingIdProd = 'G-SN3F4Z4MPK';
const trackingIdBeta = 'G-MQDZENNPXK';
const trackingIdTest = "G-KGJ72QEWMY";

// initiatize google analytics
export const initAnalytics = () => {
  switch (window.location.hostname) {
    case 'phlask.me':
      ReactGA.initialize(trackingIdProd);
      break;
    case 'beta.phlask.me':
      ReactGA.initialize(trackingIdBeta);
      break;
    default:
      ReactGA.initialize(trackingIdTest);
  }
};

// track pageviews
export const logPageView = page => {
  ReactGA.send({hitType: "pageview", page: window.location.pathname + window.location.search})
};
