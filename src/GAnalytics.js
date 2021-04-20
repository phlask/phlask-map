import ReactGA from "react-ga";

const trackingId = "UA-180456355-1"
const trackingIdTest = "UA-180456355-2"
const test = "UA-16993431-2"

// initiatize google analytics
export const initGA = () => {
    ReactGA.initialize(trackingIdTest);
    ReactGA.pageview(window.location.pathname + window.location.search);
}

// track pageviews
export const GApageView = (page) => {   
    ReactGA.pageview(page);   
}

// 
