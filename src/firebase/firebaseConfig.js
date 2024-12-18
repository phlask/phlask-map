// Sets the Phlask Database URL to use the test instance unless overriden
// This environment variable will also need to be set in the prod build pipeline to "https://phlask-prod.firebaseio.com"
// https://github.com/phlask/phlask-map/issues/498
const phlaskDatabaseUrl =
  import.meta.env.VITE_DB_URL || 'https://phlask-beta.firebaseio.com';

export const resourcesConfig = {
  apiKey: 'AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I',
  authDomain: 'phlask-web-map.firebaseapp.com',
  databaseURL: phlaskDatabaseUrl,
  projectId: 'phlask-web-map',
  storageBucket: 'phlask-web-map.appspot.com',
  messagingSenderId: '428394983826'
};

export const contributorsConfig = {
  apiKey: 'AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I',
  authDomain: 'phlask-web-map.firebaseapp.com',
  databaseURL: 'https://phlask-contributors.firebaseio.com/',
  projectId: 'phlask-web-map',
  storageBucket: 'phlask-web-map.appspot.com',
  messagingSenderId: '428394983826'
};
