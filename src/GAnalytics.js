import ReactGA from "react-ga";

const trackingIdProd = "UA-180456355-1"
const trackingIdBeta = "UA-180456355-2"
const trackingIdTest = "UA-180456355-3"

// initiatize google analytics
export const initGA = () => {
    switch(window.location.hostname) {
        case 'phlask.me':
            ReactGA.initialize(trackingIdProd);
            break
        case 'beta.phlask.me':
            ReactGA.initialize(trackingIdBeta);
            break
        default:
            ReactGA.initialize(trackingIdTest);
    }
    ReactGA.pageview(window.location.pathname + window.location.search);
}

// track pageviews
export const GApageView = (page) => {   
    ReactGA.pageview(page);   
}
