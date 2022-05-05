import { initializeApp } from 'firebase/app';

export const connectToFirebase = (hostname, resourceType) => {
  // TODO -- OLD PROD CONFIG -- DOUBLECHECK IF THIS IS NEEDED
  // const prodConfig = {
  //   apiKey: "AIzaSyA2E1tiV34Ou6CJU_wzlJtXxwATJXxi6K8",
  //   authDomain: "phlask-web-map-new-taps.firebaseapp.com",
  //   databaseURL: `https://phlask-web-map-new-taps.firebaseio.com`,
  //   projectId: "phlask-web-map-new-taps",
  //   storageBucket: "phlask-web-map-new-taps.appspot.com",
  //   messagingSenderId: "673087230724",
  //   appId: "1:673087230724:web:2545788342843cccdcf651"
  // };

  let environment;

  if (hostname === "phlask.me") {
    environment = "prod";
  } else if (hostname === "beta.phlask.me") {
    environment = "beta";
  } else {
    environment = "test";
  }

  const firebaseConfig = {
    apiKey: "AIzaSyABw5Fg78SgvedyHr8tl-tPjcn5iFotB6I",
    authDomain: "phlask-web-map.firebaseapp.com",
    databaseURL: `https://phlask-web-map-${environment}-${resourceType}-verify.firebaseio.com`,
    projectId: "phlask-web-map-new-taps",
    storageBucket: "phlask-web-map.appspot.com",
    messagingSenderId: "428394983826",
    appId: "1:428394983826:web:b81abdcfd5af5401e0514b"
  };

  // return firebase.initializeApp(firebaseConfig, "new");
  return initializeApp(firebaseConfig, "new");
};
